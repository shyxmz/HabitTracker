document.addEventListener('DOMContentLoaded', () => {
    // Get references to elements
    const addProductiveButton = document.querySelector('.add-prod-button');
    const newProductiveSiteInput = document.getElementById('new-productive-site');
    const productiveSitesList = document.getElementById('productive-sites-list');
    
    const addNonProductiveButton = document.querySelector('.add-non-prod-button');
    const newNonProductiveSiteInput = document.getElementById('new-non-productive-site');
    const nonProductiveSitesList = document.getElementById('non-productive-sites-list');
    
    const timeGoalSlider = document.getElementById('time-goal-slider');
    const timeGoalValue = document.getElementById('time-goal-value');
    const notificationsEnabledCheckbox = document.getElementById('notifications-enabled');
    const resetButton = document.getElementById('reset');
    
    // Load saved settings
    loadSettings();
    
    // Add productive site
    addProductiveButton.addEventListener('click', () => {
        const site = newProductiveSiteInput.value.trim();
        if (site) {
            addSiteToList(productiveSitesList, site);
            saveSettings();
        }
    });

    // Add non-productive site
    addNonProductiveButton.addEventListener('click', () => {
        const site = newNonProductiveSiteInput.value.trim();
        if (site) {
            addSiteToList(nonProductiveSitesList, site);
            saveSettings();
        }
    });

    // Handle time goal changes
    timeGoalSlider.addEventListener('input', () => {
        timeGoalValue.textContent = timeGoalSlider.value;
        saveSettings();
    });

    // Handle notifications checkbox
    notificationsEnabledCheckbox.addEventListener('change', () => {
        saveSettings();
    });

    // Reset settings
    resetButton.addEventListener('click', () => {
        localStorage.clear();
        loadSettings(); // Load defaults after clearing
    });

    // Helper functions
    function addSiteToList(list, site) {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<span>${site}</span><button type="button" class="remove-button">Remove</button>`;
        listItem.querySelector('.remove-button').addEventListener('click', () => {
            listItem.remove();
            saveSettings();
        });
        list.appendChild(listItem);
        newProductiveSiteInput.value = ''; // Clear input
        newNonProductiveSiteInput.value = ''; // Clear input
    }

    function saveSettings() {
        const productiveSites = [...productiveSitesList.getElementsByTagName('li')].map(item => item.querySelector('span').textContent);
        const nonProductiveSites = [...nonProductiveSitesList.getElementsByTagName('li')].map(item => item.querySelector('span').textContent);
        const timeGoal = timeGoalSlider.value;
        const notificationsEnabled = notificationsEnabledCheckbox.checked;

        const settings = {
            productiveSites,
            nonProductiveSites,
            timeGoal,
            notificationsEnabled
        };

        localStorage.setItem('settings', JSON.stringify(settings));
    }

    function loadSettings() {
        const settings = JSON.parse(localStorage.getItem('settings'));
        
        // Clear current lists
        productiveSitesList.innerHTML = '';
        nonProductiveSitesList.innerHTML = '';

        if (settings) {
            // Load productive sites
            settings.productiveSites.forEach(site => addSiteToList(productiveSitesList, site));

            // Load non-productive sites
            settings.nonProductiveSites.forEach(site => addSiteToList(nonProductiveSitesList, site));

            // Load time goal
            timeGoalSlider.value = settings.timeGoal || 60;
            timeGoalValue.textContent = settings.timeGoal || 60;

            // Load notifications
            notificationsEnabledCheckbox.checked = settings.notificationsEnabled || false;
        } else {
            // Set default values if no settings are found
            timeGoalSlider.value = 60;
            timeGoalValue.textContent = 60;
            notificationsEnabledCheckbox.checked = false;
        }
    }
});
