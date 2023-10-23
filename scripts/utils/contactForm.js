// Afficher le modal
document.addEventListener("DOMContentLoaded", () => {
    const contactButton = document.querySelector('.contact_button');
    const closeButton = document.querySelector('.close_button');

    if (contactButton) {
        contactButton.addEventListener('click', displayModal);
    }

    if (closeButton) {
        closeButton.addEventListener('click', closeModal);
    }
});

function displayModal() {
    const modal = document.getElementById("contact_modal");
    if (modal) {
        modal.style.display = "flex";
    }
}

// Fermer le modal
function closeModal() {
    const modal = document.getElementById("contact_modal");
    if (modal) {
        modal.style.display = "none";
    }
}