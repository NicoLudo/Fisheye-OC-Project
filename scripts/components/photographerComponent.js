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
        card.setAttribute('data-id', this.id);
        card.setAttribute('aria-label', `Profil du photographe ${this.name}`);

        const link = document.createElement('a');
        link.href = `/photographer.html?id=${this.id}`;

        const img = document.createElement('img');
        img.src = `./src/images/portraits/${this.portrait}`;
        img.alt = `${this.name}`;

        const name = document.createElement('h2');
        name.textContent = this.name;

        // Ajouter les éléments img et name au lien
        link.appendChild(img);
        link.appendChild(name);

        const location = document.createElement('p');
        location.textContent = `${this.city}, ${this.country}`;
        location.className = 'photographer_location';

        const tagline = document.createElement('p');
        tagline.textContent = this.tagline;
        tagline.className = 'photographer_tagline';

        const price = document.createElement('p');
        price.textContent = `${this.price}€ / jour`;

        // Ajout de tous les éléments
        card.appendChild(link);
        card.appendChild(location);
        card.appendChild(tagline);
        card.appendChild(price);

        return card;
    }

}

export default Photographer