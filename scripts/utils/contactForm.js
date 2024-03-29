document.addEventListener("DOMContentLoaded", () => {
    // Stock les éléments du DOM
    const elements = {
        contactButton: document.querySelector(".contact_button"),
        closeButton: document.querySelector(".close_button"),
        contactForm: document.querySelector(".contactForm"),
        modal: document.getElementById("contact_modal"),
        closeBTN: document.querySelector(".modal_close_btn")
    };

    // Ajout d'un écouteur d'événements pour les clics
    document.addEventListener("click", (event) => {
        if (event.target === elements.contactButton) displayModal(elements.modal);
        if (event.target === elements.closeButton) closeModal(elements.modal);
    });

    // Ajout d'un écouteur d'événements pour l'envoie du formulaire
    if (elements.contactForm) {
        elements.contactForm.addEventListener("submit", handleFormSubmit);
    }

    // La suppression des écouteurs d'événements pour éviter des problèmes
    window.addEventListener("unload", () => {
        if (elements.contactButton) elements.contactButton.removeEventListener("click", displayModal);
        if (elements.closeButton) elements.closeButton.removeEventListener("click", closeModal);
        if (elements.contactForm) elements.contactForm.removeEventListener("submit", handleFormSubmit);
    });

    // La tabulation pour le bouton de fermeture
    if (elements.closeBTN) {
        elements.closeBTN.tabIndex = 0;
        elements.closeBTN.addEventListener("keyup", handleMediaKeyUp);
    }
});

// Pour gérer la touche "Entrée" 
function handleMediaKeyUp(e) {
    if (e.key === "Enter") {
        closeModal();
    }
}

// Fonction pour afficher le modale
function displayModal() {
    const modal = document.getElementById("contact_modal");
    if (modal) {
        modal.style.display = "flex";
    }
}

// Fonction pour fermer le modale
function closeModal() {
    const modal = document.getElementById("contact_modal");
    if (modal) {
        modal.style.display = "none";
    }
}

// Fonction pour gérer la soumission du formulaire
function handleFormSubmit(event) {
    event.preventDefault();
    closeModal(document.getElementById("contact_modal"));
}
