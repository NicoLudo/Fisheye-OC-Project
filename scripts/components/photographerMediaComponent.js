import Lightbox from "../utils/lightbox.js";

class Media {
    constructor({ id, photographerId, title, image, video, likes, date, price }) {
        Object.assign(this, { id, photographerId, title, image, video, likes, date, price });
        this.Lightbox = new Lightbox(this); // Initialisation de l'instance Lightbox
        this.isLiked = false; // Ajout d'une propriété pour suivre l'état du like
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
    createVideoElement() {
        const videoWrapper = document.createElement('div');
        videoWrapper.classList.add('video-wrapper');

        const video = document.createElement('video');
        video.controls = true; // Active les contrôles de lecture pour la vidéo

        const source = document.createElement('source');
        source.src = `./src/images/others/${this.video}`;
        source.type = `video/${this.getFileExtension(this.video)}`; // Définit le type de la source vidéo

        video.appendChild(source);
        videoWrapper.appendChild(video);

        // Création d'un overlay pour gérer les clics et ouvrir la lightbox
        const clickOverlay = document.createElement('div');
        clickOverlay.classList.add('click-overlay');
        clickOverlay.addEventListener('click', (e) => {
            e.stopPropagation(); // Empêche l'événement de se propager
            this.Lightbox.openLightbox();
        });
        videoWrapper.appendChild(clickOverlay);
        return videoWrapper;
    }

    // Crée et renvoie un élément pour l'image de preview vidéo
    createVideoPreviewElement() {
        const previewWrapper = document.createElement('div');
        previewWrapper.classList.add('video-wrapper');

        const previewImage = document.createElement('img');
        previewImage.alt = `Prévisualisation de ${this.title}`;
        previewImage.classList.add('video-preview');
        previewWrapper.appendChild(previewImage);

        // Création d'un élément vidéo temporaire pour générer les prévisualisations
        const tempVideo = Media.tempVideoElement || (Media.tempVideoElement = document.createElement('video'));
        tempVideo.src = `./src/images/others/${this.video}`;
        tempVideo.addEventListener('loadeddata', () => {
            tempVideo.currentTime = 1;
        });

        tempVideo.addEventListener('seeked', () => {
            let canvas = document.createElement('canvas');
            canvas.width = tempVideo.videoWidth;
            canvas.height = tempVideo.videoHeight;
            let ctx = canvas.getContext('2d');
            ctx.drawImage(tempVideo, 0, 0, canvas.width, canvas.height);

            // Conversion du canvas en Blob puis en URL pour la prévisualisation
            canvas.toBlob(blob => {
                previewImage.src = URL.createObjectURL(blob);
            });
        });

        // Ajout d'un overlay identique à celui de la méthode createVideoElement
        const clickOverlay = document.createElement('div');
        clickOverlay.classList.add('click-overlay');
        clickOverlay.addEventListener('click', (e) => {
            e.stopPropagation();
            this.Lightbox.openLightbox();
        });
        previewWrapper.appendChild(clickOverlay);
        return previewWrapper;
    }

    // Crée et renvoie un élément DOM complet
    getMediaDOM() {
        const mediaCard = document.createElement('div');
        mediaCard.classList.add('media-card');

        // Ajout d'une image ou de la preview vidéo en fonction du type de média
        if (this.image) {
            mediaCard.appendChild(this.createImageElement());
        } else if (this.video) {
            mediaCard.appendChild(this.createVideoPreviewElement());
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
        likes.textContent = `${this.likes} ❤️`;
        likes.classList.add('photographer_media_likes');

        // Ajout pour faire un like sur un média
        likes.addEventListener('click', () => {
            if (!this.isLiked) {
                this.likes += 1;
                likes.textContent = `${this.likes} ❤️`;
                this.isLiked = true;
            }
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
