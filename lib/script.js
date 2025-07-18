let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

const timer = (seconds) => { 
    // clear any existing timers
    clearInterval(countdown);
    // set the time
    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);
    displayEndTime(then);

    countdown = setInterval(() => {
        const secondsLeft =  (then - Date.now()) / 1000;
        // check if we should stop it
        if(secondsLeft <= 0) {
            clearInterval(countdown);
            return;
        }
        // display it 
        displayTimeLeft(Math.floor(secondsLeft));
    }, 1000);
}

const displayTimeLeft = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    const display = `${minutes}:${remainderSeconds < 10 ?  '0' : '' }${remainderSeconds}`;
    document.title = display;
    timerDisplay.textContent = display;


}

const displayEndTime = (timestamp) => {
    const end = new Date(timestamp);
    const hour = end.getHours();
    const adjustedHour = hour > 12 ? hour - 12 : hour;
    const minutes = end.getMinutes();
    endTime.textContent = `Be Back AT ${adjustedHour}: ${minutes < 10 ? '0' : ''}${minutes}`;

}

const startTimer = (e) => {
    const seconds = parseInt(e.currentTarget.dataset.time);
    timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const mins = e.currentTarget.minutes.value;
    timer(mins * 60);
    console.log(mins);
    e.currentTarget.reset();
})
