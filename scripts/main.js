const buttonPressAudio = new Audio(
  "https://github.com/maykbrito/automatic-video-creator/blob/master/audios/button-press.wav?raw=true"
);
const kitchenTimer = new Audio(
  "https://github.com/maykbrito/automatic-video-creator/blob/master/audios/kichen-timer.mp3?raw=true"
);
const bgAudio = new Audio(
  "https://github.com/maykbrito/automatic-video-creator/blob/master/audios/bg-audio.mp3?raw=true"
);

bgAudio.loop = true;


const btnplay = document.querySelector(".play");
const btnpause = document.querySelector(".pause");
const btnstop = document.querySelector(".stop");
const btnSet = document.querySelector(".set");
const btnsoundOn = document.querySelector(".sound-on");
const btnsoundOff = document.querySelector(".sound-off");

const displayMinutes = document.querySelector("#minutes");
const displaySeconds = document.querySelector("#seconds");

let minutes = Number(displayMinutes.textContent);

let setTime;

btnplay.addEventListener("click", OnPlay);
btnpause.addEventListener("click", OnPause);
btnstop.addEventListener("click", OnStop);
btnsoundOn.addEventListener("click", soundOn);
btnsoundOff.addEventListener("click", soundOff);
btnSet.addEventListener("click", setMinutes);

function updateDisplay(minutes, seconds) {
  displayMinutes.textContent = String(minutes).padStart(2, "0");

  displaySeconds.textContent = String(seconds).padStart(2, "0");
}
function resetTimer() {
  updateDisplay(minutes, 0);
  clearInterval(setTime);
}
function countDown() {
  setTime = setTimeout(() => {
    let seconds = Number(displaySeconds.textContent);
    let minutes = Number(displayMinutes.textContent);

    updateDisplay(minutes, 0);

    if (minutes <= 0 && seconds < 1) {
      OnStop();
      updateDisplay(0, seconds)
      kitchenTimer.play()
      return;
    }

    if (seconds <= 0) {
      seconds = 60;
      --minutes;
    }

    updateDisplay(minutes, String(seconds - 1));

    countDown();
  }, 1000);
}


function OnPlay() {
  btnplay.classList.add("hide");
  btnpause.classList.remove("hide");
  btnSet.classList.add("hide");
  btnstop.classList.remove("hide");
  countDown();
  buttonPressAudio.play();
}
function OnPause() {
  btnpause.classList.add("hide");
  btnplay.classList.remove("hide");
  buttonPressAudio.play();
  clearTimeout(setTime);
}
function OnStop() {
  btnstop.classList.add("hide");
  btnSet.classList.remove("hide");
  btnplay.classList.remove("hide");
  btnpause.classList.add("hide");
  resetTimer();
  buttonPressAudio.play();
}
function soundOn() {
  btnsoundOff.classList.remove("hide");
  btnsoundOn.classList.add("hide");
  bgAudio.pause()
}
function soundOff() {
  btnsoundOn.classList.remove("hide");
  btnsoundOff.classList.add("hide");
  bgAudio.play()
}
function setMinutes() {
    buttonPressAudio.play(); 
    let newMinutes = prompt("Quantos minutos? :");
  
    if (!newMinutes) {
      resetTimer();
      return;
    }
    minutes = newMinutes;
    displayMinutes.textContent = String(minutes).padStart(2, "0");
}
