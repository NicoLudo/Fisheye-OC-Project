class Lightbox {
    constructor(media) {
        this.media = media;
        this.closeLightbox = this.closeLightbox.bind(this); // Liaison de la méthode closeLightbox au contexte actuel de 'this'
    }

    // Méthode pour ouvrir la lightbox et afficher le média
    openLightbox() {
        console.log('Opening lightbox for', this.media.title);
        const lightboxFragment = document.createDocumentFragment();

        // Création de l'overlay de la lightbox
        const lightboxOverlay = document.createElement('div');
        lightboxOverlay.classList.add('lightbox-overlay');

        // Création du conteneur de la lightbox
        const lightboxContainer = document.createElement('div');
        lightboxContainer.classList.add('lightbox-container');

        // Affichage images et vidéos dans la lightbox
        if (this.media.image) {
            lightboxContainer.appendChild(this.media.createImageElement(true));
        }

        if (this.media.video) {
            lightboxContainer.appendChild(this.media.createVideoElement(true));
            setTimeout(() => this.media.playVideo(), 0);
        }

        // Création des boutons de navigation de la lightbox
        const prevButton = document.createElement('button');
        prevButton.textContent = '<';
        prevButton.classList.add('lightbox-previous-button');
        lightboxContainer.appendChild(prevButton);

        const nextButton = document.createElement('button');
        nextButton.textContent = '>';
        nextButton.classList.add('lightbox-next-button');
        lightboxContainer.appendChild(nextButton);

        // Création du bouton de fermeture de la lightbox
        const closeButton = document.createElement('button');
        closeButton.textContent = '×';
        closeButton.classList.add('lightbox-close-button');
        closeButton.addEventListener('click', this.closeLightbox);
        lightboxContainer.appendChild(closeButton);

        // Ajout de l'overlay et du conteneur à la lightbox puis au corps du document
        lightboxOverlay.appendChild(lightboxContainer);
        lightboxFragment.appendChild(lightboxOverlay);
        document.body.appendChild(lightboxFragment);

        // Désactivation du scroll de la page
        document.body.style.overflow = 'hidden';
    }

    // Méthode pour fermer la lightbox
    closeLightbox() {
        const lightboxOverlay = document.querySelector('.lightbox-overlay');
        lightboxOverlay && lightboxOverlay.remove();
        this.closeButton && this.closeButton.removeEventListener('click', this.closeLightbox);
        document.body.style.overflow = ''; // Réactivation du scroll de la page
    }
}

export default Lightbox;
