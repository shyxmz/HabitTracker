//  Storage Manager.js // 
function saveSettings(settings){
    // local storage of chrome can only store strings so settings are converted to JSON string using the stringify function // 
    localStorage.setItem('settings', JSON.stringify(settings));
}
function loadSettings(){
    // load the settings from local storage and convert it back to JSON object using the parse function //
    return JSON.parse(localStorage.getItem('setttings'));
}
function clearSettings(){
    // Clear the settings // 
    localStorage.clear();
}

export { saveSettings, loadSettings, clearSettings };