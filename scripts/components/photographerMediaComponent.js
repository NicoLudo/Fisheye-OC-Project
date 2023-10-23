class Media {
    constructor({ id, photographerId, title, image, video, likes, date, price }) {
        Object.assign(this, { id, photographerId, title, image, video, likes, date, price });
    }

    // Méthode pour obtenir l'extension d'un fichier
    getFileExtension(filename) {
        return filename.split('.').pop();
    }

    // Crée un élément img
    createImageElement() {
        const img = document.createElement('img');
        img.src = `./src/images/others/${this.image}`;
        img.alt = this.title;
        return img;
    }

    // Crée un élément video
    createVideoElement() {
        const video = document.createElement('video');
        video.controls = true;

        const source = document.createElement('source');
        source.src = `./src/images/others/${this.video}`;
        source.type = `video/${this.getFileExtension(this.video)}`;

        video.appendChild(source);
        return video;
    }

    getMediaDOM() {
        const mediaCard = document.createElement('div');
        mediaCard.classList.add('media-card');

        if (this.image) {
            mediaCard.appendChild(this.createImageElement());
        } else if (this.video) {
            mediaCard.appendChild(this.createVideoElement());
        }

        const infoDiv = document.createElement('div');
        infoDiv.classList.add('info-div');

        const title = document.createElement('p');
        title.textContent = this.title;
        title.classList.add('photographer_media_title');

        const likes = document.createElement('p');
        likes.textContent = `${this.likes} ❤️`;
        likes.classList.add('photographer_media_likes');

        // Ajout des éléments avec createDocumentFragment pour éviter les reflow qui peuvent couter en perf
        const fragment = document.createDocumentFragment();
        fragment.appendChild(title);
        fragment.appendChild(likes);
        infoDiv.appendChild(fragment);

        mediaCard.appendChild(infoDiv);
        return mediaCard;
    }
}

export default Media;
