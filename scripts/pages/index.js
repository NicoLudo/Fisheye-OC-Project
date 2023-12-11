import Photographer from "../components/photographerComponent.js";

async function getPhotographers() {
    try {
        // Récupère les datas des photographes
        const response = await fetch("./data/photographers.json");
        // En cas d'erreur
        if (!response.ok) {
            throw new Error("Erreur lors de la récupération des données.");
        }
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error("Il y a eu un problème avec l'opération fetch : ", error.message);
    }
}

// Fonction pour afficher les données des photographes
async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographerData) => {
        const photographer = new Photographer(photographerData);
        const userCardDOM = photographer.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

// Fonction principale pour l'affichage
async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
}

init();
