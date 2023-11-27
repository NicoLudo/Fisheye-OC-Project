import Lightbox from "../utils/lightbox.js";

class Media {
    constructor({ id, photographerId, title, image, video, likes, date, price }) {
        Object.assign(this, { id, photographerId, title, image, video, likes, date, price });
        this.Lightbox = new Lightbox(this);
        this.isLiked = false;
    }

    // Méthode pour obtenir l'extension d'un fichier à partir de son nom
    getFileExtension(filename) {
        return filename.split('.').pop();
    }

    // Crée et renvoie un élément image HTML
    createImageElement(isForLightbox = false) {
        const img = document.createElement('img');
        img.src = `./src/images/others/${this.image}`;
        img.alt = this.title;
        img.loading = 'lazy'; // Ajout de lazy loading pour les images

        if (!isForLightbox) {
            img.addEventListener('click', (e) => {
                e.stopPropagation();
                this.Lightbox.openLightbox();
            });
        }
        return img;
    }

    // Crée et renvoie un élément vidéo HTML
    createVideoElement(isForLightbox = false) {
        const videoWrapper = document.createElement('div');
        videoWrapper.classList.add('video-wrapper');

        const video = document.createElement('video');
        video.controls = isForLightbox; // Active les contrôles de lecture pour la vidéo uniquement dans la lightbox
        video.autoplay = isForLightbox; // Ajout de l'autoplay pour la vidéo uniquement dans la lightbox

        video.addEventListener('click', (e) => {
            e.stopPropagation();
        });

        const source = document.createElement('source');
        source.src = `./src/images/others/${this.video}`;
        source.type = `video/${this.getFileExtension(this.video)}`;

        video.appendChild(source);
        videoWrapper.appendChild(video);

        // Création d'un overlay pour gérer les clics et ouvrir la lightbox
        const clickOverlay = document.createElement('div');
        clickOverlay.classList.add('click-overlay');
        if (!isForLightbox) {
            clickOverlay.addEventListener('click', (e) => {
                e.stopPropagation();
                this.Lightbox.openLightbox();
            });
        }

        videoWrapper.appendChild(clickOverlay);
        return videoWrapper;
    }

    playVideo() {
        if (this.video) {
            const videoElement = document.querySelector(`video[src='./src/images/others/${this.video}']`);
            videoElement && videoElement.play();
        }
    }

    // Crée et renvoie un élément DOM complet
    getMediaDOM() {
        const mediaCard = document.createElement('div');
        mediaCard.classList.add('media-card');

        // Ajout d'une image ou de la preview vidéo en fonction du type de média
        if (this.image) {
            mediaCard.appendChild(this.createImageElement());
        } else if (this.video) {
            mediaCard.appendChild(this.createVideoElement());
        }

        // Création de la div contenant les informations du média
        const infoDiv = document.createElement('div');
        infoDiv.classList.add('info-div');

        // Création et ajout du titre du média
        const title = document.createElement('p');
        title.textContent = this.title;
        title.classList.add('photographer_media_title');

        // Création et ajout du nombre de likes
        const likes = document.createElement('p');
        likes.textContent = `${this.likes} ♡`;
        likes.classList.add('photographer_media_likes');

        // Gestion du clic sur les likes
        likes.addEventListener('click', () => {
            // Inverse l'état du like et met à jour le nombre de likes
            this.isLiked = !this.isLiked;
            this.likes += this.isLiked ? 1 : -1;
            likes.textContent = `${this.likes} ${this.isLiked ? '❤️' : '♡'}`;
        });

        // Utilisation de DocumentFragment pour améliorer les performances en évitant les reflows
        const fragment = document.createDocumentFragment();
        fragment.appendChild(title);
        fragment.appendChild(likes);
        infoDiv.appendChild(fragment);

        // Ajout de la div d'informations à la carte média
        mediaCard.appendChild(infoDiv);
        return mediaCard;
    }
}

export default Media;
