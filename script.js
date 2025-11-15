// OpenWeatherMap API 配置
const API_KEY = 'YOUR_API_KEY_HERE'; // 需要替换为实际的 API Key
const API_BASE_URL = 'https://api.openweathermap.org/data/2.5';

// 城市配置
const cities = {
    local: {
        name: '北京',
        lat: 39.9042,
        lon: 116.4074,
        timezone: 'Asia/Shanghai'
    },
    paris: {
        name: '巴黎',
        lat: 48.8566,
        lon: 2.3522,
        timezone: 'Europe/Paris'
    },
    newyork: {
        name: '纽约',
        lat: 40.7128,
        lon: -74.0060,
        timezone: 'America/New_York'
    }
};

// 天气图标映射
const weatherIcons = {
    '01d': '☀️', '01n': '🌙',
    '02d': '⛅', '02n': '☁️',
    '03d': '☁️', '03n': '☁️',
    '04d': '☁️', '04n': '☁️',
    '09d': '🌧️', '09n': '🌧️',
    '10d': '🌦️', '10n': '🌧️',
    '11d': '⛈️', '11n': '⛈️',
    '13d': '❄️', '13n': '❄️',
    '50d': '🌫️', '50n': '🌫️'
};

// 空气质量等级
const aqiLevels = {
    1: { text: '优秀', color: '#27ae60' },
    2: { text: '良好', color: '#f39c12' },
    3: { text: '中等', color: '#e67e22' },
    4: { text: '较差', color: '#e74c3c' },
    5: { text: '差', color: '#8e44ad' }
};

// 计时器状态
let timerState = {
    mode: 'stopwatch', // 'stopwatch' or 'countdown'
    isRunning: false,
    seconds: 0,
    targetSeconds: 0,
    interval: null,
    laps: []
};

// ============ 时间显示功能 ============

function updateTime() {
    updateCityTime('local', cities.local.timezone);
    updateCityTime('paris', cities.paris.timezone);
    updateCityTime('newyork', cities.newyork.timezone);
}

function updateCityTime(cityKey, timezone) {
    const timeElement = document.getElementById(`${cityKey}-time`);
    const now = new Date();

    const timeString = now.toLocaleTimeString('zh-CN', {
        timeZone: timezone,
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });

    timeElement.textContent = timeString;
}

// ============ 天气数据获取 ============

async function fetchWeather(cityKey, lat, lon) {
    try {
        // 获取天气数据
        const weatherResponse = await fetch(
            `${API_BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=zh_cn`
        );
        const weatherData = await weatherResponse.json();

        // 获取空气质量数据
        const aqiResponse = await fetch(
            `${API_BASE_URL}/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
        );
        const aqiData = await aqiResponse.json();

        updateWeatherDisplay(cityKey, weatherData, aqiData);
    } catch (error) {
        console.error(`获取 ${cityKey} 天气数据失败:`, error);
        showWeatherError(cityKey);
    }
}

function updateWeatherDisplay(cityKey, weatherData, aqiData) {
    // 更新温度
    document.getElementById(`${cityKey}-temp`).textContent =
        `${Math.round(weatherData.main.temp)}°C`;

    // 更新天气描述
    document.getElementById(`${cityKey}-desc`).textContent =
        weatherData.weather[0].description;

    // 更新天气图标
    const iconCode = weatherData.weather[0].icon;
    document.getElementById(`${cityKey}-weather-icon`).textContent =
        weatherIcons[iconCode] || '🌤️';

    // 更新湿度
    document.getElementById(`${cityKey}-humidity`).textContent =
        `${weatherData.main.humidity}%`;

    // 更新空气质量
    const aqi = aqiData.list[0].main.aqi;
    const aqiElement = document.getElementById(`${cityKey}-aqi`);
    const aqiInfo = aqiLevels[aqi] || { text: '--', color: '#95a5a6' };
    aqiElement.textContent = aqiInfo.text;
    aqiElement.style.color = aqiInfo.color;
}

function showWeatherError(cityKey) {
    document.getElementById(`${cityKey}-temp`).textContent = '--°C';
    document.getElementById(`${cityKey}-desc`).textContent = '无法获取数据';
    document.getElementById(`${cityKey}-humidity`).textContent = '--%';
    document.getElementById(`${cityKey}-aqi`).textContent = '--';
}

function updateAllWeather() {
    fetchWeather('local', cities.local.lat, cities.local.lon);
    fetchWeather('paris', cities.paris.lat, cities.paris.lon);
    fetchWeather('newyork', cities.newyork.lat, cities.newyork.lon);
}

// ============ 城市选择功能 ============

const cityModal = document.getElementById('city-modal');
const selectCityBtn = document.getElementById('select-city-btn');
const closeModalBtn = document.getElementById('close-modal');
const citySearch = document.getElementById('city-search');
const citySuggestions = document.getElementById('city-suggestions');

selectCityBtn.addEventListener('click', () => {
    cityModal.classList.add('active');
    citySearch.focus();
});

closeModalBtn.addEventListener('click', () => {
    cityModal.classList.remove('active');
});

cityModal.addEventListener('click', (e) => {
    if (e.target === cityModal) {
        cityModal.classList.remove('active');
    }
});

// 城市搜索过滤
citySearch.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const cityOptions = citySuggestions.querySelectorAll('.city-option');

    cityOptions.forEach(option => {
        const cityName = option.textContent.toLowerCase();
        if (cityName.includes(searchTerm)) {
            option.style.display = 'block';
        } else {
            option.style.display = 'none';
        }
    });
});

// 城市选择
citySuggestions.addEventListener('click', (e) => {
    if (e.target.classList.contains('city-option')) {
        const cityName = e.target.dataset.city;
        const lat = parseFloat(e.target.dataset.lat);
        const lon = parseFloat(e.target.dataset.lon);

        cities.local.name = cityName;
        cities.local.lat = lat;
        cities.local.lon = lon;

        document.getElementById('local-city-name').textContent = cityName;
        fetchWeather('local', lat, lon);

        cityModal.classList.remove('active');

        // 保存到本地存储
        localStorage.setItem('selectedCity', JSON.stringify({
            name: cityName,
            lat: lat,
            lon: lon
        }));
    }
});

// 加载保存的城市
function loadSavedCity() {
    const savedCity = localStorage.getItem('selectedCity');
    if (savedCity) {
        const city = JSON.parse(savedCity);
        cities.local.name = city.name;
        cities.local.lat = city.lat;
        cities.local.lon = city.lon;
        document.getElementById('local-city-name').textContent = city.name;
    }
}

// ============ 计时器功能 ============

const stopwatchModeBtn = document.getElementById('stopwatch-mode');
const countdownModeBtn = document.getElementById('countdown-mode');
const countdownInputGroup = document.getElementById('countdown-input-group');
const timerDisplay = document.getElementById('timer-display');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const lapBtn = document.getElementById('lap-btn');
const lapsList = document.getElementById('laps-list');

// 模式切换
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

// 开始
startBtn.addEventListener('click', () => {
    if (timerState.mode === 'countdown') {
        const hours = parseInt(document.getElementById('hours-input').value) || 0;
        const minutes = parseInt(document.getElementById('minutes-input').value) || 0;
        const seconds = parseInt(document.getElementById('seconds-input').value) || 0;

        timerState.targetSeconds = hours * 3600 + minutes * 60 + seconds;

        if (timerState.targetSeconds === 0) {
            alert('请设置倒计时时间');
            return;
        }

        if (timerState.seconds === 0) {
            timerState.seconds = timerState.targetSeconds;
        }
    }

    startTimer();
});

// 暂停
pauseBtn.addEventListener('click', () => {
    stopTimer();
});

// 重置
resetBtn.addEventListener('click', () => {
    stopTimer();
    timerState.seconds = 0;
    timerState.laps = [];
    updateTimerDisplay();
    updateLapsDisplay();
});

// 计圈
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
    startBtn.disabled = true;
    pauseBtn.disabled = false;
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

function stopTimer() {
    timerState.isRunning = false;
    clearInterval(timerState.interval);
    startBtn.disabled = false;
    pauseBtn.disabled = true;
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
        lapsList.innerHTML = '<div style="text-align: center; color: var(--text-secondary); padding: 20px;">暂无计圈记录</div>';
        return;
    }

    lapsList.innerHTML = timerState.laps
        .slice()
        .reverse()
        .map(lap => `
            <div class="lap-item">
                <div class="lap-number">第 ${lap.lap} 圈</div>
                <div class="lap-times">
                    <div class="lap-time">
                        <span class="lap-label">阶段</span>
                        <span class="lap-value">${formatTime(lap.split)}</span>
                    </div>
                    <div class="total-time">
                        <span class="lap-label">累计</span>
                        <span class="lap-value">${formatTime(lap.total)}</span>
                    </div>
                </div>
            </div>
        `)
        .join('');
}

// ============ 倒计时提醒 ============

function triggerAlert() {
    // 播放系统提示音
    playAlertSound();

    // 屏幕闪烁
    const flashOverlay = document.getElementById('flash-overlay');
    flashOverlay.classList.add('flashing');

    setTimeout(() => {
        flashOverlay.classList.remove('flashing');
    }, 1500);
}

function playAlertSound() {
    // 使用 Web Audio API 生成提示音
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 800;
    oscillator.type = 'sine';

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
}

// ============ 初始化 ============

function init() {
    // 加载保存的城市
    loadSavedCity();

    // 初始化时间显示
    updateTime();
    setInterval(updateTime, 1000);

    // 初始化天气数据
    updateAllWeather();
    // 每10分钟更新一次天气
    setInterval(updateAllWeather, 600000);

    // 初始化计时器显示
    updateTimerDisplay();
    updateLapsDisplay();

    console.log('应用初始化完成');
    console.log('请在 script.js 中将 YOUR_API_KEY_HERE 替换为你的 OpenWeatherMap API Key');
    console.log('获取 API Key: https://openweathermap.org/api');
}

// 页面加载完成后初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
