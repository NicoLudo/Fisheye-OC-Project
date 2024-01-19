const initDropdown = () => {
    const dropdown = document.getElementById("dropdown-options");
    const selectedOption = document.getElementById("selected-option");

    dropdown.addEventListener("click", function (event) {
        const option = event.target.closest(".sorting-option a");

        // Si rien n'est trouvé (clic en dehors des options), alors ne fait rien
        if (!option) return;

        event.preventDefault();

        // Mettre à jour le texte de selected-option
        selectedOption.textContent = option.textContent;

        // Déplace l'option choisie vers le haut
        dropdown.insertBefore(option.parentElement, dropdown.firstChild);

        // Enlève l'ancienne option comme sélectionnée et marque l'option actuelle comme sélectionnée
        const previouslySelected = dropdown.querySelector(".sorting-option.selected");
        if (previouslySelected) {
            previouslySelected.classList.remove("selected");
        }
        option.parentElement.classList.add("selected");

        // Ferme le dropdown et met à jour la flèche
        selectedOption.classList.toggle("open");
        dropdown.classList.add("hidden");
    });

    // Ouvrir ou fermer le dropdown
    selectedOption.addEventListener("click", function (event) {
        dropdown.classList.toggle("hidden");
        this.classList.toggle("open");
        event.stopPropagation();
    });

    // Fermer le dropdown si on clique en dehors
    document.addEventListener("click", (event) => {
        if (!selectedOption.contains(event.target) && !dropdown.contains(event.target)) {
            dropdown.classList.add("hidden");
            selectedOption.classList.remove("open");
        }
    });
};

export default initDropdown;
