// Wait for the document to be fully loaded
document.addEventListener('DOMContentLoaded', function() {

    // Find the filter dropdown element
    const filterSelect = document.getElementById('tacopsFilterSelect');

    // Check if the filter element exists on the page
    if (filterSelect) {

        // Add an event listener for when the user changes the selection
        filterSelect.addEventListener('change', function() {

            // Get the selected archetype value (e.g., "recon", "security")
            const selectedArchetype = this.value;

            // Get all the containers that hold a TacOp card
            const allTacopContainers = document.querySelectorAll('.tacop-container');

            // Loop through each card container to decide if it should be shown or hidden
            allTacopContainers.forEach(container => {
                // Find the actual card element inside the container
                const card = container.querySelector('.tacop.card');

                // If "All" is selected OR the card has the class of the selected archetype
                if (selectedArchetype === "" || card.classList.contains(selectedArchetype)) {
                    // Show the container
                    container.style.display = '';
                } else {
                    // Hide the container
                    container.style.display = 'none';
                }
            });
        });
    }

    // Note: The "Favorites" toggle functionality is not implemented here.
    // It would require a system (like browser local storage) to remember
    // which cards a user has favorited between visits.
});
