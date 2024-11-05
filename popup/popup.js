// To load the data when the popup is opened //
document.addEventListener('DOMContentLoaded',loadPopupData);

// Function to convert the time hours and minutes //
function formatTime(hours,minutes){
    const hours = Math.floor(minutes/60);
    const mins = minutes%60;
    return `$(hours)h $(mins)m`;
}

// To load and Display the usgae stats, progress, and time categories // 
async function loadPopupData() {
    const data = await chrome.storage.local.get(['productiveTime', 'nonProductiveTime', 'goalProgress']);
    document.getElementById('productive-time').querySelector('span').textContent = formatTime(data.productiveTime || 0);
    document.getElementById('non-productive-time').querySelector('span').textContent = formatTime(data.nonProductiveTime || 0);
    document.getElementById('usage-progress').value = data.goalProgress || 0;
}

// Open the dashboard page // 
function openDashboard() {
    chrome.tabs.create({url: chrome.runtime.getURL('dashboard/dashboard.html')});
}

// Open the settings page // 
function openSettings(){
    chrome.runtime.openOptionsPage();
}

// Reset the stats and show notifications // 
async function resetStats() {
    await chrome.storage.local.set({
        productiveTime: 0,
        nonProductiveTime: 0,
        goalProgress: 0,
    });
    loadPopupData();
    showNotifications("Statistics have been reset!");
}

// Display the notification (temporary) //
function showNotifications(message) {
    const notification = document.getElementById('notification-message');
    notification.textContent = message;
    notification.style.display = 'block';
    setTimeout(() => notification.style.display = 'none',3000); // revert back after showing the notification for 3s // 
}

// Event listeners for the buttons // 
document.getElementById('view-dashboard').addEventListener('click', openDashboard);
document.getElementById('open-settings').addEventListener('click', openSettings);
document.getElementById('reset').addEventListener('click',resetStats);