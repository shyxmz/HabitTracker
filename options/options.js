document.addEventListener('DOMContentLoaded', () => {
    // Get references to elements
    const addProductiveButton = document.querySelector('.add-button');
    const newProductiveSiteInput = document.getElementById('new-productive-site');
    const productiveSitesList = document.getElementById('productive-sites-list');
    
    const addNonProductiveButton = document.querySelector('.add-button');
    const newNonProductiveSiteInput = document.getElementById('new-non-productive-site');
    const nonProductiveSitesList = document.getElementById('non-productive-sites-list');
    
    const timeGoalSlider = document.getElementById('time-goal-slider');
    const timeGoalValue = document.getElementById('time-goal-value');
    const notificationsEnabledCheckbox = document.getElementById('notifications-enabled');
    const resetButton = document.getElementById('reset');
    
    // Load saved settings
    console.log("Loading settings from local storage...");
    loadSettings();
    
    // Add productive site
    addProductiveButton.addEventListener('click', () => {
        const site = newProductiveSiteInput.value.trim();
        console.log("Add Productive Site button clicked:", site);
        if (site) {
            addSiteToList(productiveSitesList, site);
            saveSettings();
        }
    });

    // Add non-productive site
    addNonProductiveButton.addEventListener('click', () => {
        const site = newNonProductiveSiteInput.value.trim();
        console.log("Add Non-Productive Site button clicked:", site);
        if (site) {
            addSiteToList(nonProductiveSitesList, site);
            saveSettings();
        }
    });

    // Handle time goal changes
    timeGoalSlider.addEventListener('input', () => {
        timeGoalValue.textContent = timeGoalSlider.value;
        console.log("Time goal slider value changed to:", timeGoalSlider.value);
        saveSettings();
    });

    // Handle notifications checkbox
    notificationsEnabledCheckbox.addEventListener('change', () => {
        console.log("Notifications checkbox changed to:", notificationsEnabledCheckbox.checked);
        saveSettings();
    });

    // Reset settings
    resetButton.addEventListener('click', () => {
        console.log("Reset button clicked. Clearing local storage.");
        localStorage.clear();
        loadSettings();
    });

    // Helper functions
    function addSiteToList(list, site) {
        const listItem = document.createElement('li');
        listItem.innerHTML = `<span>${site}</span><button type="button" class="remove-button">Remove</button>`;
        listItem.querySelector('.remove-button').addEventListener('click', () => {
            console.log("Removing site:", site);
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

        console.log("Saving settings to local storage:", settings);
        localStorage.setItem('settings', JSON.stringify(settings));
    }

    function loadSettings() {
        const settings = JSON.parse(localStorage.getItem('settings'));
        if (settings) {
            // Load productive sites
            settings.productiveSites.forEach(site => {
                console.log("Loading productive site:", site);
                addSiteToList(productiveSitesList, site);
            });

            // Load non-productive sites
            settings.nonProductiveSites.forEach(site => {
                console.log("Loading non-productive site:", site);
                addSiteToList(nonProductiveSitesList, site);
            });

            // Load time goal
            timeGoalSlider.value = settings.timeGoal || 60;
            timeGoalValue.textContent = settings.timeGoal || 60;
            console.log("Loaded time goal:", settings.timeGoal || 60);

            // Load notifications
            notificationsEnabledCheckbox.checked = settings.notificationsEnabled || false;
            console.log("Loaded notifications setting:", settings.notificationsEnabled || false);
        } else {
            console.log("No settings found in local storage.");
        }
    }
});
