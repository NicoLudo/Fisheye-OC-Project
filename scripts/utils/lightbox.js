class Lightbox {
    constructor(media, allMedia, mediaIndex) {
        this.media = media;
        this.allMedia = allMedia;
        this.mediaIndex = mediaIndex;
        this.openLightbox = this.openLightbox.bind(this);
        this.closeLightbox = this.closeLightbox.bind(this);
        this.goToPrevious = this.goToPrevious.bind(this);
        this.goToNext = this.goToNext.bind(this);
    }

    // Méthode pour ouvrir la Lightbox
    openLightbox() {
        console.log("Opening lightbox for", this.media.title);
        const lightboxFragment = document.createDocumentFragment();

        // Création de l'overlay de la lightbox
        const lightboxOverlay = document.createElement("div");
        lightboxOverlay.classList.add("lightbox-overlay");

        // Création du conteneur de la lightbox
        const lightboxContainer = document.createElement("div");
        lightboxContainer.classList.add("lightbox-container");

        // Création de l'élément média (image ou vidéo)
        const mediaElement = this.media.image
            ? this.createImageElement(this.media.image)
            : this.createVideoElement(this.media.video);

        lightboxContainer.appendChild(mediaElement);

        // Création des boutons précédent et suivant pour naviguer entre les médias
        const prevButton = document.createElement("button");
        prevButton.textContent = "<";
        prevButton.classList.add("lightbox-previous-button");
        lightboxContainer.appendChild(prevButton);

        const nextButton = document.createElement("button");
        nextButton.textContent = ">";
        nextButton.classList.add("lightbox-next-button");
        lightboxContainer.appendChild(nextButton);

        prevButton.addEventListener("click", this.goToPrevious);
        nextButton.addEventListener("click", this.goToNext);

        // Création du bouton de fermeture de la Lightbox
        const closeButton = document.createElement("button");
        closeButton.textContent = "×";
        closeButton.classList.add("lightbox-close-button");
        closeButton.addEventListener("click", () => this.closeLightbox(true));
        lightboxContainer.appendChild(closeButton);

        lightboxOverlay.appendChild(lightboxContainer);
        lightboxFragment.appendChild(lightboxOverlay);
        document.body.appendChild(lightboxFragment);

        // Désactivation du scroll de la page
        document.body.style.overflow = "hidden";
    }

    // Méthode pour créer un élément image
    createImageElement(imageFileName) {
        const img = document.createElement("img");
        img.src = `./src/images/others/${imageFileName}`;
        img.alt = this.media.title;
        return img;
    }

    // Méthode pour créer un élément vidéo
    createVideoElement(videoFileName) {
        const video = document.createElement("video");
        video.src = `./src/images/others/${videoFileName}`;
        video.controls = true;
        video.autoplay = true;
        return video;
    }

    // Méthode pour passer au média suivant
    goToNext() {
        const currentMediaCard = document.querySelector(`.media-card[data-id="${this.media.id}"]`);
        const nextMediaCard = currentMediaCard.nextElementSibling;

        if (nextMediaCard) {
            const nextMediaId = nextMediaCard.dataset.id;
            const nextMedia = this.allMedia.find(media => media.id.toString() === nextMediaId);
            new Lightbox(nextMedia, this.allMedia, this.allMedia.indexOf(nextMedia)).openLightbox();
            this.closeLightbox();
        }
    }

    // Méthode pour passer au média précédent
    goToPrevious() {
        const currentMediaCard = document.querySelector(`.media-card[data-id="${this.media.id}"]`);
        const prevMediaCard = currentMediaCard.previousElementSibling;

        if (prevMediaCard) {
            const prevMediaId = prevMediaCard.dataset.id;
            const prevMedia = this.allMedia.find(media => media.id.toString() === prevMediaId);
            new Lightbox(prevMedia, this.allMedia, this.allMedia.indexOf(prevMedia)).openLightbox();
            this.closeLightbox();
        }
    }

    // Méthode pour fermer la Lightbox
    closeLightbox(close = false) {
        const lightboxOverlay = document.querySelector(".lightbox-overlay");
        lightboxOverlay && lightboxOverlay.remove();
        // Rétablit le défilement de la page
        if (close) document.body.style.overflow = "";
    }
}

export default Lightbox;
