const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");
var timer = [0,0,0,0]; //[min, second, hundredth of a second, thousandth of a second]
var interval;
var timerRunning = false;

testArea.addEventListener("keyup", spellcheck, false)
testArea.addEventListener("keypress", start, false)
resetButton.addEventListener("click", reset, false)

/**
 * 
 * @param {time} 
 * helper function to add leading zeros to the digits. otherwise JS treats 03 as just 3; 
 */
function leadingZero(time){
    if(time <= 9){
        time =  "0" + time;
    }
    return time;
}

// event listener for when a key is pressed in the text box area;
function start(){
    let textEnteredLength = testArea.value.length;
    if (textEnteredLength === 0 && !timerRunning){
        timerRunning = true;
        interval = setInterval(function(){
            let currentTime = leadingZero(timer[0]) + ":" + leadingZero(timer[1]) + ":" + timer[2];
            timer[3]++;
            timer[0] = Math.floor((timer[3]/100)/60);
            timer[1] = Math.floor((timer[3]/100) - (timer[0] * 60));
            timer[2] = Math.floor(timer[3] - (timer[1]*100) - (timer[0] * 6000));
            theTimer.innerHTML =  currentTime;
        }, 10)
    }
    

}


function spellcheck(){
    let textEnteredValue = testArea.value;
    let chunk = originText.substring(0, textEnteredValue.length);
    
    if(originText === textEnteredValue) {
        clearInterval(interval);
        testWrapper.style.borderColor = "green" 
    } else {   
        if(chunk === textEnteredValue) {
            testWrapper.style.borderColor = "blue";
        } else {
            testWrapper.style.borderColor = "#E95D0F"       
        }
    }
}

function reset(){
    clearInterval(interval); //ensures the browser is not running an nterval in the background after we start a new one 
    interval = null; //ensures when we reassign setInterval the next time we start the app, we are not setting up a new interval with a new index number.
    timer = [0,0,0,0];
    timerRunning = false; //for our start() to work
    testArea.value = "";
    theTimer.innerHTML = "00:00:00";
    testWrapper.style.borderColor = "gray";
    
}



