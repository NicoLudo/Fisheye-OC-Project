import PhotographerBanner from "../components/photographerBannerComponent.js";
import PhotographerMedias from "../components/photographerMediaComponent.js";
import initDropdown from "../utils/dropdown.js";

// Récupération de l'ID du photographe 
const urlParams = new URLSearchParams(window.location.search);
const photographerId = urlParams.get('id');

// Variables globales
let globalData = null;
let mediaDOMElements = [];

// Élements du DOM
const photographerNameElement = document.querySelector('#photographer_name');
const mediaContainer = document.querySelector('#media-list');
const photographerPriceElement = document.querySelector('#photographer-price');
const totalLikesElement = document.querySelector('#total-likes');

// Récupère les données des photographes et des médias à partir du JSON
async function fetchData() {
    try {
        const response = await fetch('./data/photographers.json');
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des données.');
        }
        globalData = await response.json();
        globalData.photographers = new Map(globalData.photographers.map(p => [p.id, p]));
    } catch (error) {
        console.error("Il y a eu un problème avec l'opération fetch : ", error.message);
    }
}

// Récupère les infos d'un photographe par son ID
function getPhotographerById(id) {
    return globalData ? globalData.photographers.get(parseInt(id)) : null;
}

// Affichage de la bannière du photographe
function displayBanner(photographerData) {
    const mainElement = document.querySelector('.photograph-header');
    const photographerBanner = new PhotographerBanner(photographerData);
    mainElement.appendChild(photographerBanner.getBannerDOM());
}

// Met à jour le nom du photographe dans le modal
function setPhotographerNameInModal(photographerName) {
    if (photographerNameElement) {
        photographerNameElement.textContent = photographerName;
    }
}

// Affichage des médias du photographe
function displayMedia(photographerId) {
    if (globalData) {
        let mediaList = globalData.media.filter(media => media.photographerId === parseInt(photographerId));
        mediaDOMElements = [];
        mediaContainer.innerHTML = '';
        mediaList.forEach((mediaItem, index) => {
            const media = new PhotographerMedias(mediaItem, mediaList, index);
            const mediaDOM = media.getMediaDOM();
            mediaDOM.dataset.mediaIndex = index.toString();
            mediaDOMElements.push(mediaDOM);
            mediaContainer.appendChild(mediaDOM);
        });
        attachSortEventListeners(mediaList);
        sortAndDisplayMedia(mediaList, 'likes');
    }
}

// Écouteurs d'événements pour le trie des médias
function attachSortEventListeners(mediaList) {
    document.querySelector('#sort-popularity').addEventListener('click', () => sortAndDisplayMedia(mediaList, 'likes'));
    document.querySelector('#sort-date').addEventListener('click', () => sortAndDisplayMedia(mediaList, 'date'));
    document.querySelector('#sort-title').addEventListener('click', () => sortAndDisplayMedia(mediaList, 'title'));
}

// Tri et affichage des médias
function sortAndDisplayMedia(mediaList, sortBy) {
    const sortedList = [...mediaList].sort((a, b) => {
        if (sortBy === 'date' || sortBy === 'title') {
            return a[sortBy].localeCompare(b[sortBy]);
        } else {
            return b[sortBy] - a[sortBy];
        }
    });
    displaySortedMedia(sortedList);
}

// Affichage des médias triés
function displaySortedMedia(sortedList) {
    sortedList.forEach(mediaItem => {
        const mediaDOM = mediaDOMElements.find(mediaDOM => mediaDOM.dataset.id === mediaItem.id.toString());
        if (mediaDOM) {
            mediaContainer.appendChild(mediaDOM);
        }
    });
}

// Calcul du total des likes des médias du photographe
function calculateTotalLikes(photographerId) {
    return globalData ? globalData.media.filter(media => media.photographerId === parseInt(photographerId))
        .reduce((acc, mediaItem) => acc + mediaItem.likes, 0) : 0;
}

// Affichage du prix et du total de likes dans l'encadrer en bas
function updatePhotographerInfoBox(photographerData) {
    if (photographerPriceElement && totalLikesElement) {
        photographerPriceElement.textContent = photographerData.price;
        totalLikesElement.textContent = calculateTotalLikes(photographerData.id);
    }
}

// Fonction d'initialisation principale
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
