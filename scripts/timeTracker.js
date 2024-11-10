let timeSpent = 0;
let timer = null;
 
function startTimeTracking(){
    timer = setInterval(() => {
         timeSpent++;
         console.log(`Time spent: ${timeSpent}s`);
    } ,1000);
}

function stopTimeTracking(){
    clearInterval(timer);
}

function resetTimeTracking(){
    timeSpent = 0;
    clearInterval(timer);
}

function getTimeSpent(){
    return timeSpent;
}

export { startTimeTracking, stopTimeTracking, resetTimeTracking, getTimeSpent };