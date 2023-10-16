import PhotographerBanner from "../components/photographerBannerComponent.js";

// Récupération de l'ID du photographe depuis l'URL
const urlParams = new URLSearchParams(window.location.search);
const photographerId = urlParams.get('id');

async function getPhotographerById(id) {
    try {
        const response = await fetch('./data/photographers.json');
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des données.');
        }
        const data = await response.json();
        return data.photographers.find(photographer => photographer.id === parseInt(id));
    } catch (error) {
        console.error("Il y a eu un problème avec l'opération fetch : ", error.message);
    }
}

// Fonction pour afficher le banner du photographe
async function displayBanner(photographerData) {
    const mainElement = document.getElementById('main');

    const photographerBanner = new PhotographerBanner(photographerData);
    const bannerDOM = photographerBanner.getBannerDOM();
    mainElement.appendChild(bannerDOM);
}

// Fonction principale pour l'affichage
async function init() {
    if (photographerId) {
        const photographerData = await getPhotographerById(photographerId);
        if (photographerData) {
            displayBanner(photographerData);
        } else {
            console.error('Photographe non trouvé.');
        }
    } else {
        console.error("ID du photographe non fourni dans l'URL.");
    }
}

init();
