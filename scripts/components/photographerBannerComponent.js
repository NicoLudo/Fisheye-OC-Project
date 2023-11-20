class Banner {
    constructor({ name, city, country, tagline, portrait }) {
        Object.assign(this, { name, city, country, tagline, portrait });
    }

    // Méthode utilitaire pour créer un élément DOM
    createElement(tag, text, className) {
        const element = document.createElement(tag);
        if (text) element.textContent = text;
        if (className) element.classList.add(className);
        return element;
    }

    getBannerDOM() {
        const banner = this.createElement('div', null, 'banner-container');

        // Crée la colonne de gauche
        const leftColumn = this.createElement('div', null, 'left-column');
        const name = this.createElement('h1', this.name);
        const location = this.createElement('p', `${this.city}, ${this.country}`, 'photographerBanner_location');
        const tagline = this.createElement('p', this.tagline, 'photographerBanner_tagline');

        leftColumn.append(name, location, tagline);

        // Crée la colonne du milieu
        const middleColumn = this.createElement('div', null, 'middle-column');
        const contactButton = document.querySelector('.contact_button');

        if (contactButton) {
            middleColumn.appendChild(contactButton);
        }

        // Crée la colonne de droite
        const rightColumn = this.createElement('div', null, 'right-column');
        const img = this.createElement('img');
        img.src = `./src/images/portraits/${this.portrait}`;
        img.alt = this.name;

        rightColumn.appendChild(img);

        // Ajoute toutes les colonnes à la bannière
        banner.append(leftColumn, middleColumn, rightColumn);

        return banner;
    }
}

export default Banner;
