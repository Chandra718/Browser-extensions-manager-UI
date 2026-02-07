document.addEventListener('DOMContentLoaded', () => {
    const extensionsListContainer = document.getElementById('extensions-list');

    // Function to fetch data from data.json
    async function fetchExtensions() {
        try {
            const response = await fetch('data.json');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const extensions = await response.json();
            renderExtensions(extensions);
        } catch (error) {
            console.error('Error fetching extensions:', error);
            extensionsListContainer.innerHTML = '<p>Failed to load extensions. Please try again later.</p>';
        }
    }

    // Function to render extensions on the page
    function renderExtensions(extensions) {
        extensionsListContainer.innerHTML = ''; // Clear existing content
        extensions.forEach(extension => {
            const extensionCard = document.createElement('div');
            extensionCard.classList.add('extension-card'); // We'll style this later
            if (!extension.isActive) {
                extensionCard.classList.add('inactive'); // Add class for inactive state
            }

            extensionCard.innerHTML = `
                <img src="${extension.logo}" alt="${extension.name} logo" class="extension-logo">
                <h3 class="extension-name">${extension.name}</h3>
                <p class="extension-description">${extension.description}</p>
                <button class="remove-button">Remove</button>
                <button class="toggle-active-button">${extension.isActive ? 'Deactivate' : 'Activate'}</button>
            `;
            extensionsListContainer.appendChild(extensionCard);
        });
    }

    // Initial fetch and render when the page loads
    fetchExtensions();
});