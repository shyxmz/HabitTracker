// Function for sending a notification
// To be imported in the background.js
function sendNotification(message) {
    chrome.notifications.create({
        type: 'basic',
        iconUrl: 'assets/logo.png', // Make sure this path is correct
        title: 'MindfulSurf',
        message: message,
        priority: 2
    });
}

// Check if the user has exceeded their time goal for a site
function checkForExcessiveTime(timeSpent, timeGoal, siteURL) {
    if (timeSpent >= timeGoal) {
        sendNotification(`You have exceeded your daily goal of ${timeGoal} minutes on ${siteURL}`);
    }
}

export { sendNotification, checkForExcessiveTime };
