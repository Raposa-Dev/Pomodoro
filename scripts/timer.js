export function Timer() {
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
        updateDisplay(0, seconds);
        kitchenTimer.play();
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

  return{
    resetTimer,
    countDown
  }

}
