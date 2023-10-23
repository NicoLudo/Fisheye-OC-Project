import PhotographerBanner from "../components/photographerBannerComponent.js";
import PhotographerMedias from "../components/photographerMediaComponent.js";

// Récupération de l'ID du photographe depuis l'URL
const urlParams = new URLSearchParams(window.location.search);
const photographerId = urlParams.get('id');

// Pour stocker les données globales
let globalData = null;

// Fonction pour récupérer les données du fichier JSON
async function fetchData() {
    try {
        const response = await fetch('./data/photographers.json');
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des données.');
        }
        globalData = await response.json();
    } catch (error) {
        console.error("Il y a eu un problème avec l'opération fetch : ", error.message);
    }
}

// Fonction pour obtenir les détails d'un photographe
function getPhotographerById(id) {
    if (globalData) {
        return globalData.photographers.find(photographer => photographer.id === parseInt(id));
    }
    return null;
}

// Fonction pour ajouter le nom du photographe dans le formulaire modal
function setPhotographerNameInModal(photographerName) {
    const photographerNameElement = document.getElementById('photographer_name');
    if (photographerNameElement) {
        photographerNameElement.textContent = photographerName;
    }
}

// Fonction pour trier les médias
function sortMedia(mediaList, sortBy) {
    if (sortBy === "popularite") {
        return mediaList.sort((a, b) => b.likes - a.likes);
    } else if (sortBy === "date") {
        return mediaList.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortBy === "titre") {
        return mediaList.sort((a, b) => a.title.localeCompare(b.title));
    }
    return mediaList;
}

// Fonction pour afficher les médias
function displayMedia(photographerId) {
    if (globalData) {
        let mediaList = globalData.media.filter(media => media.photographerId === parseInt(photographerId));
        const sortSelect = document.getElementById('sort-select');

        // Trier par popularité par défaut
        mediaList = sortMedia(mediaList, "popularite");

        // Gestionnaire d'événements pour le changement de sélection
        sortSelect.addEventListener('change', function () {
            const sortedList = sortMedia([...mediaList], this.value);
            displaySortedMedia(sortedList);
        });

        displaySortedMedia(mediaList);
    }
}

// Fonction pour afficher les médias triés
function displaySortedMedia(sortedList) {
    const mediaContainer = document.getElementById('media-list');
    mediaContainer.innerHTML = "";
    sortedList.forEach(mediaItem => {
        const media = new PhotographerMedias(mediaItem);
        mediaContainer.appendChild(media.getMediaDOM());
    });
}

const selectElement = document.getElementById("sort-select");
const arrowIcon = document.getElementById("arrow-icon");

// Quand le select est ouvert
selectElement.addEventListener("focus", function () {
    arrowIcon.classList.remove("arrow-down");
    arrowIcon.classList.add("arrow-up");
});

// Quand le select est fermé
selectElement.addEventListener("blur", function () {
    arrowIcon.classList.remove("arrow-up");
    arrowIcon.classList.add("arrow-down");
});

// Fonction pour afficher le banner du photographe
function displayBanner(photographerData) {
    const mainElementCollection = document.getElementsByClassName('photograph-header');

    const mainElement = mainElementCollection[0];

    const photographerBanner = new PhotographerBanner(photographerData);
    const bannerDOM = photographerBanner.getBannerDOM();
    mainElement.appendChild(bannerDOM);
}

// Fonction pour calculer le total des likes pour un photographe
function calculateTotalLikes(photographerId) {
    let totalLikes = 0;
    if (globalData) {
        const mediaList = globalData.media.filter(media => media.photographerId === parseInt(photographerId));
        mediaList.forEach(mediaItem => {
            totalLikes += mediaItem.likes;
        });
    }
    return totalLikes;
}

// Fonction pour mettre à jour l'encadré des infos du photographe
function updatePhotographerInfoBox(photographerData) {
    const photographerPriceElement = document.getElementById('photographer-price');
    const totalLikesElement = document.getElementById('total-likes');

    if (photographerPriceElement && totalLikesElement) {
        photographerPriceElement.textContent = photographerData.price;
        totalLikesElement.textContent = calculateTotalLikes(photographerData.id);
    }
}

// const contactForm = document.getElementById('contactForm');

// contactForm.addEventListener('submit', function (event) {
//     event.preventDefault();

//     // Masquer le formulaire
//     contactForm.style.display = 'none';

//     // Afficher le message de remerciement
//     const thankYouMessage = document.createElement('p');
//     thankYouMessage.innerHTML = "Merci pour votre prise de contact. Le photographe reviendra vers vous dès que possible.";
//     contactForm.parentElement.appendChild(thankYouMessage);
// });

// Fonction principale pour l'affichage
async function init() {
    await fetchData();
    if (photographerId) {
        const photographerData = getPhotographerById(photographerId);
        if (photographerData) {
            displayBanner(photographerData);
            displayMedia(photographerId);
            setPhotographerNameInModal(photographerData.name);
            updatePhotographerInfoBox(photographerData);
        } else {
            console.error('Photographe non trouvé.');
        }
    } else {
        console.error("ID du photographe non fourni dans l'URL.");
    }
}


init();
