// Importing js file for background functions // 

import { saveSettings, loadSettings, clearSettings } from './scripts/StorageManager.js';
import { isProductiveSite, isNonProductiveSite } from './scripts/siteCategorizer.js';
import { sendNotification, checkForExcessiveTime } from './scripts/notifications.js';
import { startTimeTracking, stopTimeTracking, getTimeSpent } from './scripts/timeTracker.js';

// Initialize the settings as soon as the extension is installed or loaded  // 
chrome.runtime.onInstalled.addListener(() => {
    
})