class Photographer {
    constructor({ id, name, city, country, tagline, price, portrait }) {
        Object.assign(this, { id, name, city, country, tagline, price, portrait });
    }

    getUserCardDOM() {
        const card = document.createElement('article');
        card.classList.add('photographer-card');
        card.dataset.id = this.id;
        card.setAttribute('aria-label', `Profil du photographe ${this.name}`);

        const link = document.createElement('a');
        link.href = `/photographer.html?id=${this.id}`;

        const img = document.createElement('img');
        img.src = `./src/images/portraits/${this.portrait}`;
        img.alt = this.name;

        const name = document.createElement('h2');
        name.textContent = this.name;

        // Ajout de l'image et du nom dans le lien
        link.append(img, name);

        const location = document.createElement('span');
        location.textContent = `${this.city}, ${this.country}`;
        location.classList.add('photographer_location');

        const tagline = document.createElement('span');
        tagline.textContent = this.tagline;
        tagline.classList.add('photographer_tagline');

        const price = document.createElement('span');
        price.textContent = `${this.price}€ / jour`;

        // Ajout de tous les éléments
        card.append(link, location, tagline, price);

        return card;
    }
}

export default Photographer;
