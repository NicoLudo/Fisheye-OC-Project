import Lightbox from "../utils/lightbox.js";

class Media {
    constructor({ id, photographerId, title, image, video, likes, date, price }, allMedia, mediaIndex) {
        Object.assign(this, { id, photographerId, title, image, video, likes, date, price });
        this.allMedia = allMedia;
        this.mediaIndex = mediaIndex;
        this.Lightbox = new Lightbox(this, this.allMedia, this.mediaIndex);
        this.isLiked = false;
    }

    // Méthode pour obtenir l'extension de fichier
    getFileExtension(filename) {
        return filename.split(".").pop();
    }

    // Méthode pour créer un élément image
    createImageElement() {
        const img = document.createElement("img");
        img.src = `./src/images/others/${this.image}`;
        img.alt = this.title;
        img.loading = "lazy";
        img.tabIndex = 0;

        img.addEventListener("keyup", (e) => this.handleMediaKeyUp(e));
        img.addEventListener("click", (e) => this.handleMediaClick(e));
        return img;
    }

    // Méthode pour créer un élément vidéo
    createVideoElement(isForLightbox = false) {
        const videoWrapper = document.createElement("div");
        videoWrapper.classList.add("video-wrapper");
        videoWrapper.tabIndex = 0;

        const video = this.setupVideoElement(isForLightbox);
        videoWrapper.appendChild(video);
        videoWrapper.appendChild(this.createClickOverlay());

        videoWrapper.addEventListener("keyup", (e) => this.handleMediaKeyUp(e));
        videoWrapper.addEventListener("click", (e) => this.handleMediaClick(e));

        return videoWrapper;
    }

    // Méthode pour configurer l'élément vidéo
    setupVideoElement(isForLightbox) {
        const video = document.createElement("video");
        video.controls = isForLightbox;
        video.autoplay = isForLightbox;

        const source = document.createElement("source");
        source.src = `./src/images/others/${this.video}`;
        source.type = `video/${this.getFileExtension(this.video)}`;
        video.appendChild(source);

        return video;
    }

    // Méthode pour créer un overlay de clic
    createClickOverlay() {
        const clickOverlay = document.createElement("div");
        clickOverlay.classList.add("click-overlay");
        clickOverlay.addEventListener("click", (e) => this.handleMediaClick(e));
        return clickOverlay;
    }

    // Méthode pour gérer le clic sur les médias
    handleMediaClick(e) {
        e.stopPropagation();
        this.Lightbox.openLightbox(this.allMedia, this.mediaIndex);
    }

    // Méthode pour gérer la touche "Entrée" sur les médias
    handleMediaKeyUp(e) {
        if (e.key === "Enter") {
            this.Lightbox.openLightbox(this.allMedia, this.mediaIndex);
        }
    }

    // Méthode pour lire la vidéo
    playVideo() {
        if (this.video) {
            const videoElement = document.querySelector(`video[src="./src/images/others/${this.video}"]`);
            if (videoElement) {
                videoElement.play();
            }
        }
    }

    // Méthode pour créer et renvoyer le DOM complet
    getMediaDOM() {
        const mediaCard = this.createMediaCard();
        this.appendMediaInfo(mediaCard);
        return mediaCard;
    }

    // Méthode pour créer la carte média
    createMediaCard() {
        const mediaCard = document.createElement("div");
        mediaCard.dataset.id = this.id.toString();
        mediaCard.classList.add("media-card");

        const mediaElement = this.image ? this.createImageElement() : this.createVideoElement();
        mediaCard.appendChild(mediaElement);

        return mediaCard;
    }

    // Méthode pour ajouter des informations sur le média
    appendMediaInfo(mediaCard) {
        const infoDiv = document.createElement("div");
        infoDiv.classList.add("info-div");

        const title = this.createMediaTitle();
        const likes = this.createLikesElement();

        // Document Fragment pour les performances
        const fragment = document.createDocumentFragment();
        fragment.appendChild(title);
        fragment.appendChild(likes);
        infoDiv.appendChild(fragment);

        mediaCard.appendChild(infoDiv);
    }

    // Méthode pour créer le titre du média
    createMediaTitle() {
        const title = document.createElement("p");
        title.textContent = this.title;
        title.classList.add("photographer_media_title");
        return title;
    }

    // Méthode pour créer l'élément des likes
    createLikesElement() {
        const likes = document.createElement("p");
        likes.textContent = `${this.likes} ♡`;
        likes.classList.add("photographer_media_likes");
        likes.addEventListener("click", () => this.toggleLikes(likes));
        return likes;
    }

    // Méthode pour basculer les likes
    toggleLikes(likesElement) {
        this.isLiked = !this.isLiked;
        const likeChange = this.isLiked ? 1 : -1;
        this.likes += likeChange;
        likesElement.textContent = `${this.likes} ${this.isLiked ? "❤️" : "♡"}`;

        document.dispatchEvent(new CustomEvent('likeUpdated', { detail: likeChange }));
    }
}

export default Media;
