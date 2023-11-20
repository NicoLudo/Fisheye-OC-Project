import PhotographerBanner from "../components/photographerBannerComponent.js";
import PhotographerMedias from "../components/photographerMediaComponent.js";
import initDropdown from "../utils/dropdown.js";

// Récupération de l'ID du photographe depuis l'URL
const urlParams = new URLSearchParams(window.location.search);
const photographerId = urlParams.get('id');

// Pour stocker les données globales
let globalData = null;

// Éléments du DOM mis en cache
const photographerNameElement = document.getElementById('photographer_name');
const mediaContainer = document.getElementById('media-list');
const photographerPriceElement = document.getElementById('photographer-price');
const totalLikesElement = document.getElementById('total-likes');

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
        // Optionnel: Logique de nouvelle tentative ou gestion de l'erreur utilisateur
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
    if (photographerNameElement) {
        photographerNameElement.textContent = photographerName;
    }
}

// Fonction pour afficher les médias
function displayMedia(photographerId) {
    if (globalData) {
        let mediaList = globalData.media.filter(media => media.photographerId === parseInt(photographerId));
        attachSortEventListeners(mediaList);
        sortAndDisplayMedia(mediaList, 'likes');
    }
}

// Fonction pour afficher les médias triés
function displaySortedMedia(sortedList) {
    mediaContainer.innerHTML = "";
    sortedList.forEach(mediaItem => {
        const media = new PhotographerMedias(mediaItem);
        mediaContainer.appendChild(media.getMediaDOM());
    });
}

// Fonction pour attacher les écouteurs d'événements pour le tri
function attachSortEventListeners(mediaList) {
    document.getElementById('sort-popularity').addEventListener('click', () => sortAndDisplayMedia(mediaList, 'likes'));
    document.getElementById('sort-date').addEventListener('click', () => sortAndDisplayMedia(mediaList, 'date'));
    document.getElementById('sort-title').addEventListener('click', () => sortAndDisplayMedia(mediaList, 'title'));
}

// Fonction pour trier et afficher les médias
function sortAndDisplayMedia(mediaList, sortBy) {
    const sortedList = mediaList.sort((a, b) => {
        if (sortBy === 'date' || sortBy === 'title') {
            return a[sortBy].localeCompare(b[sortBy]);
        } else {
            return b[sortBy] - a[sortBy];
        }
    });
    displaySortedMedia(sortedList);
}

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
    if (globalData) {
        return globalData.media.filter(media => media.photographerId === parseInt(photographerId))
            .reduce((acc, mediaItem) => acc + mediaItem.likes, 0);
    }
    return 0;
}

// Fonction pour mettre à jour l'encadré des infos du photographe
function updatePhotographerInfoBox(photographerData) {
    if (photographerPriceElement && totalLikesElement) {
        photographerPriceElement.textContent = photographerData.price;
        totalLikesElement.textContent = calculateTotalLikes(photographerData.id);
    }
}

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
    initDropdown();
}

init();
