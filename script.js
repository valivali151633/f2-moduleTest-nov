let activeTimers = 0;
//importing elements from html to js 
let activeTimersSection = document.getElementById("active-timers-section")
const timeSetBtn =document.getElementById("set-btn");
const noTimers = document.getElementById("noTimers");

  //adding event listner to set-btn to add multiple timers dynamically from the data collected by input
timeSetBtn.addEventListener("click" , startNewTimer);

function startNewTimer() {
    // assigning  values to variables 
    const hours = parseInt(document.getElementById('hours').value) || 0;
    const minutes = parseInt(document.getElementById('minutes').value) || 0;
    const seconds = parseInt(document.getElementById('seconds').value) || 0;
    
    
    if (hours === 0 && minutes === 0 && seconds === 0) {
      alert('Please enter a valid time.');
      return;
    }
    let totalTimeInSeconds = hours * 3600 + minutes * 60 + seconds;
    const newTimer = document.createElement("div");
    newTimer.classList.add("timer");
    newTimer.innerHTML= `
    <p>Time Left :</p>
    <div id="time-values">
        <input id="hours" type="number" min="0" max="24" placeholder="${hours}">
        <p>:<P>
        <input id="minutes" type="number" min="0" max="60" placeholder="${minutes}">
        <p>:<P>
        <input id="seconds" type="number" min="0" max="60" placeholder="${seconds}">
    </div>
    <button class="btn" onclick="deleteTimer(this)">Delete</button>
    `;
    activeTimersSection.appendChild(newTimer);
    noTimers.style.display="none";
    activeTimers++;

    updateActiveTimers(totalTimeInSeconds, newTimer)

}



//updating each second of time
function updateActiveTimers(totalTimeInSeconds, newTimer ){
  let timeValues = newTimer.querySelector("#time-values");
    let hours = timeValues.querySelector("#hours");
    let minutes = timeValues.querySelector("#minutes");
    let seconds = timeValues.querySelector("#seconds");

     const timerUpdate = setInterval(()=>{
      if(totalTimeInSeconds==0){
        newTimer.classList.toggle("time-up");
        newTimer.innerHTML=`
        <p>Time up!</p>
        <button class="delete-btn btn" onclick="deleteTimer(this)">Stop</button>`;
      

      // Audio.play();
      clearInterval(timerUpdate);
    }else{
      --totalTimeInSeconds;
      
      hours.value = Math.floor(totalTimeInSeconds / 3600);
      minutes.value = Math.floor((totalTimeInSeconds % 3600) / 60);
      seconds.value = totalTimeInSeconds % 60;
     
      
    }
     },1000)

}


// to activate delete button after completion of time
function deleteTimer(deleteButton) {
  // audio.pause();
  let currentTimerCard = deleteButton.parentNode;
  currentTimerCard.remove();
  --activeTimers;
  if (activeTimers == 0) {
    noTimers.style.display = "block";
  }
}
  
  
