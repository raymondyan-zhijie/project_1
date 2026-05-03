// ============ 计时器功能 ============

const stopwatchModeBtn = document.getElementById('stopwatch-mode');
const countdownModeBtn = document.getElementById('countdown-mode');
const countdownInputGroup = document.getElementById('countdown-input-group');
const timerDisplay = document.getElementById('timer-display');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const stopBtn = document.getElementById('stop-btn');
const resetBtn = document.getElementById('reset-btn');
const lapBtn = document.getElementById('lap-btn');
const lapsList = document.getElementById('laps-list');

stopwatchModeBtn.addEventListener('click', () => {
    switchMode('stopwatch');
});

countdownModeBtn.addEventListener('click', () => {
    switchMode('countdown');
});

function switchMode(mode) {
    if (timerState.isRunning) {
        stopTimer();
    }

    timerState.mode = mode;
    timerState.seconds = 0;
    timerState.isPaused = false;
    timerState.laps = [];

    if (mode === 'stopwatch') {
        stopwatchModeBtn.classList.add('active');
        countdownModeBtn.classList.remove('active');
        countdownInputGroup.style.display = 'none';
    } else {
        countdownModeBtn.classList.add('active');
        stopwatchModeBtn.classList.remove('active');
        countdownInputGroup.style.display = 'flex';
    }

    updateTimerDisplay();
    updateLapsDisplay();
}

startBtn.addEventListener('click', () => {
    if (timerState.mode === 'countdown' && !timerState.isPaused) {
        const hours = parseInt(document.getElementById('hours-input').value) || 0;
        const minutes = parseInt(document.getElementById('minutes-input').value) || 0;
        const seconds = parseInt(document.getElementById('seconds-input').value) || 0;

        timerState.seconds = hours * 3600 + minutes * 60 + seconds;

        if (timerState.seconds === 0) {
            alert(currentLang === 'zh' ? '请设置倒计时时间' : 'Please set countdown time');
            return;
        }
    }

    startTimer();
});

pauseBtn.addEventListener('click', () => {
    pauseTimer();
});

stopBtn.addEventListener('click', () => {
    stopTimer();
});

resetBtn.addEventListener('click', () => {
    stopTimer();
    timerState.seconds = 0;
    timerState.isPaused = false;
    timerState.laps = [];
    updateTimerDisplay();
    updateLapsDisplay();
});

lapBtn.addEventListener('click', () => {
    if (!timerState.isRunning) return;

    const lapTime = timerState.seconds;
    const previousLapTime = timerState.laps.length > 0
        ? timerState.laps[timerState.laps.length - 1].total
        : 0;

    timerState.laps.push({
        lap: timerState.laps.length + 1,
        split: lapTime - previousLapTime,
        total: lapTime
    });

    updateLapsDisplay();
});

function startTimer() {
    timerState.isRunning = true;
    timerState.isPaused = false;
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    stopBtn.disabled = false;
    lapBtn.disabled = false;

    timerState.interval = setInterval(() => {
        if (timerState.mode === 'stopwatch') {
            timerState.seconds++;
        } else {
            timerState.seconds--;

            if (timerState.seconds <= 0) {
                timerState.seconds = 0;
                stopTimer();
                triggerAlert();
            }
        }

        updateTimerDisplay();
    }, 1000);
}

function pauseTimer() {
    timerState.isRunning = false;
    timerState.isPaused = true;
    clearInterval(timerState.interval);
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    stopBtn.disabled = false;
    lapBtn.disabled = true;
}

function stopTimer() {
    timerState.isRunning = false;
    timerState.isPaused = false;
    clearInterval(timerState.interval);
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    stopBtn.disabled = true;
    lapBtn.disabled = true;
}

function updateTimerDisplay() {
    timerDisplay.textContent = formatTime(timerState.seconds);
}

function formatTime(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function updateLapsDisplay() {
    if (timerState.laps.length === 0) {
        lapsList.innerHTML = `<div style="text-align: center; color: var(--text-secondary-day); padding: 20px;">${t('no-laps')}</div>`;
        return;
    }

    lapsList.innerHTML = timerState.laps
        .slice()
        .reverse()
        .map(lap => `
            <div class="lap-item">
                <div class="lap-number">${t('lap-number').replace('{n}', lap.lap)}</div>
                <div class="lap-times">
                    <div class="lap-time">
                        <span class="lap-label">${t('lap-time')}</span>
                        <span class="lap-value">${formatTime(lap.split)}</span>
                    </div>
                    <div class="total-time">
                        <span class="lap-label">${t('total-time')}</span>
                        <span class="lap-value">${formatTime(lap.total)}</span>
                    </div>
                </div>
            </div>
        `)
        .join('');
}

// ============ 倒计时提醒 ============

function triggerAlert() {
    playAlertSound(5);

    const flashOverlay = document.getElementById('flash-overlay');
    flashOverlay.classList.add('flashing');

    setTimeout(() => {
        flashOverlay.classList.remove('flashing');
    }, 5000);
}

let alertAudioContext = null;

function playAlertSound(duration = 5) {
    if (!alertAudioContext) {
        alertAudioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (alertAudioContext.state === 'suspended') {
        alertAudioContext.resume();
    }

    const beepInterval = 0.3;
    const beepDuration = 0.2;
    const numBeeps = Math.floor(duration / beepInterval);

    for (let i = 0; i < numBeeps; i++) {
        const startTime = alertAudioContext.currentTime + (i * beepInterval);
        const oscillator = alertAudioContext.createOscillator();
        const gainNode = alertAudioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(alertAudioContext.destination);

        oscillator.frequency.value = 800;
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(0.3, startTime + 0.01);
        gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + beepDuration);

        oscillator.start(startTime);
        oscillator.stop(startTime + beepDuration);
    }
}
