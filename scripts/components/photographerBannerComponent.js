class Banner {
    // Initialisation des propriétés
    constructor({ name, city, country, tagline, portrait }) {
        this.name = name;
        this.city = city;
        this.country = country;
        this.tagline = tagline;
        this.portrait = portrait;
    }

    // Méthode pour générer DOM
    getBannerDOM() {
        const banner = document.createElement('div');
        banner.className = 'banner-container';

        // Colonne de gauche
        const leftColumn = document.createElement('div');
        leftColumn.className = 'left-column';

        const name = document.createElement('h1');
        name.textContent = this.name;

        const location = document.createElement('p');
        location.textContent = `${this.city}, ${this.country}`;
        location.className = 'photographerBanner_location';

        const tagline = document.createElement('p');
        tagline.textContent = this.tagline;

        leftColumn.appendChild(name);
        leftColumn.appendChild(location);
        leftColumn.appendChild(tagline);

        // Colonne du milieu
        const middleColumn = document.createElement('div');
        middleColumn.className = 'middle-column';

        const contactButton = document.querySelector('.contact_button');
        if (contactButton) {
            contactButton.onclick = () => displayModal();
        } else {
            console.error('Bouton de contact non trouvée dans le HTML.')
        }

        middleColumn.appendChild(contactButton);

        // Colonne de droite
        const rightColumn = document.createElement('div');
        rightColumn.className = 'right-column';

        const img = document.createElement('img');
        img.src = `./src/images/portraits/${this.portrait}`;
        img.alt = `${this.name}`;

        rightColumn.appendChild(img);

        // Ajouter toutes les colonnes à la bannière
        banner.appendChild(leftColumn);
        banner.appendChild(middleColumn);
        banner.appendChild(rightColumn);

        return banner;
    }
}

export default Banner;
