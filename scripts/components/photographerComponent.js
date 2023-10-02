class Photographer {
    // Initialisation des propriétés
    constructor({ id, name, city, country, tagline, price, portrait }) {
        this.id = id;
        this.name = name;
        this.city = city;
        this.country = country;
        this.tagline = tagline;
        this.price = price;
        this.portrait = portrait;
    }

    // Méthode pour générer DOM
    getUserCardDOM() {
        const card = document.createElement('article');
        card.className = 'photographer-card';

        const img = document.createElement('img');
        img.src = `./src/images/portraits/${this.portrait}`;
        img.alt = `${this.name}`;

        const name = document.createElement('h2');
        name.textContent = this.name;

        const location = document.createElement('p');
        location.textContent = `${this.city}, ${this.country}`;

        const tagline = document.createElement('p');
        tagline.textContent = this.tagline;

        const price = document.createElement('p');
        price.textContent = `${this.price}€ / jour`;

        // Ajout de tous les éléments
        card.appendChild(img);
        card.appendChild(name);
        card.appendChild(location);
        card.appendChild(tagline);
        card.appendChild(price);

        return card;
    }
}

export default Photographer