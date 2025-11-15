// OpenWeatherMap API 配置
const API_KEY = '970d3d113e627a7f76997229a4149b8e';
const API_BASE_URL = 'https://api.openweathermap.org/data/2.5';

// 城市配置
const cities = {
    local: {
        name: 'Beijing',
        nameCN: '北京',
        lat: 39.9042,
        lon: 116.4074,
        timezone: 'Asia/Shanghai'
    },
    paris: {
        name: 'Paris',
        nameCN: '巴黎',
        lat: 48.8566,
        lon: 2.3522,
        timezone: 'Europe/Paris'
    },
    newyork: {
        name: 'New York',
        nameCN: '纽约',
        lat: 40.7128,
        lon: -74.0060,
        timezone: 'America/New_York'
    },
    shanghai: {
        name: 'Shanghai',
        nameCN: '上海',
        lat: 31.2304,
        lon: 121.4737,
        timezone: 'Asia/Shanghai'
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
    1: { key: 'aqi-excellent', color: '#27ae60' },
    2: { key: 'aqi-good', color: '#f39c12' },
    3: { key: 'aqi-moderate', color: '#e67e22' },
    4: { key: 'aqi-poor', color: '#e74c3c' },
    5: { key: 'aqi-very-poor', color: '#8e44ad' }
};

// 计时器状态
let timerState = {
    mode: 'stopwatch', // 'stopwatch' or 'countdown'
    isRunning: false,
    isPaused: false,
    seconds: 0,
    targetSeconds: 0,
    interval: null,
    laps: []
};

// 存储日出日落数据
const sunriseSunsetCache = {};

// ============ 语言切换功能 ============

document.addEventListener('DOMContentLoaded', () => {
    // 初始化语言
    updateTranslations();

    // 语言切换按钮事件
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            switchLanguage(lang);
        });
    });
});

// ============ 时间和日期显示功能 ============

function updateTime() {
    updateCityTime('local', cities.local.timezone);
    updateCityTime('paris', cities.paris.timezone);
    updateCityTime('newyork', cities.newyork.timezone);
    updateCityTime('shanghai', cities.shanghai.timezone);
}

function updateCityTime(cityKey, timezone) {
    const timeElement = document.getElementById(`${cityKey}-time`);
    const dateElement = document.getElementById(`${cityKey}-date`);
    const now = new Date();

    const timeString = now.toLocaleTimeString('zh-CN', {
        timeZone: timezone,
        hour12: false,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });

    const dateString = now.toLocaleDateString(currentLang === 'zh' ? 'zh-CN' : 'en-US', {
        timeZone: timezone,
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long'
    });

    timeElement.textContent = timeString;
    dateElement.textContent = dateString;
}

// ============ 天气数据获取 ============

async function fetchWeather(cityKey, lat, lon) {
    try {
        // 获取天气数据
        const weatherResponse = await fetch(
            `${API_BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=${currentLang === 'zh' ? 'zh_cn' : 'en'}`
        );
        const weatherData = await weatherResponse.json();

        // 获取空气质量数据
        const aqiResponse = await fetch(
            `${API_BASE_URL}/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
        );
        const aqiData = await aqiResponse.json();

        updateWeatherDisplay(cityKey, weatherData, aqiData);

        // 更新日夜主题
        updateDayNightTheme(cityKey, weatherData.sys.sunrise, weatherData.sys.sunset, weatherData.timezone);
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
    const aqiInfo = aqiLevels[aqi] || { key: 'aqi-moderate', color: '#95a5a6' };
    aqiElement.textContent = t(aqiInfo.key);
    aqiElement.style.color = aqiInfo.color;
}

function showWeatherError(cityKey) {
    document.getElementById(`${cityKey}-temp`).textContent = '--°C';
    document.getElementById(`${cityKey}-desc`).textContent = t('loading');
    document.getElementById(`${cityKey}-humidity`).textContent = '--%';
    document.getElementById(`${cityKey}-aqi`).textContent = '--';
}

function updateAllWeather() {
    fetchWeather('local', cities.local.lat, cities.local.lon);
    fetchWeather('paris', cities.paris.lat, cities.paris.lon);
    fetchWeather('newyork', cities.newyork.lat, cities.newyork.lon);
    fetchWeather('shanghai', cities.shanghai.lat, cities.shanghai.lon);
}

// ============ 日夜主题切换 ============

function updateDayNightTheme(cityKey, sunrise, sunset, timezoneOffset) {
    const cityCard = document.getElementById(`${cityKey}-card`);
    const now = Math.floor(Date.now() / 1000); // 当前时间戳（秒）

    // 考虑时区偏移
    const localNow = now + timezoneOffset;
    const localSunrise = sunrise;
    const localSunset = sunset;

    // 判断是否是夜间（日落后或日出前）
    const isNight = localNow < localSunrise || localNow > localSunset;

    if (isNight) {
        cityCard.classList.add('night-theme');
    } else {
        cityCard.classList.remove('night-theme');
    }
}

// ============ 城市选择功能 ============

const cityModal = document.getElementById('city-modal');
const selectCityBtn = document.getElementById('select-city-btn');
const closeModalBtn = document.getElementById('close-modal');
const citySearch = document.getElementById('city-search');
const citySuggestions = document.getElementById('city-suggestions');

// 三级选择器
const continentSelect = document.getElementById('continent-select');
const countrySelect = document.getElementById('country-select');
const citySelect = document.getElementById('city-select');

selectCityBtn.addEventListener('click', () => {
    cityModal.classList.add('active');
    citySearch.focus();
    initializeContinentSelect();
});

closeModalBtn.addEventListener('click', () => {
    cityModal.classList.remove('active');
});

cityModal.addEventListener('click', (e) => {
    if (e.target === cityModal) {
        cityModal.classList.remove('active');
    }
});

// 初始化洲选择器
function initializeContinentSelect() {
    const continents = getContinents();
    continentSelect.innerHTML = `<option value="">${t('select-continent')}</option>`;
    continents.forEach(continent => {
        const option = document.createElement('option');
        option.value = continent;
        option.textContent = t(continent);
        continentSelect.appendChild(option);
    });
}

// 洲选择变化
continentSelect.addEventListener('change', (e) => {
    const continent = e.target.value;
    if (!continent) {
        countrySelect.disabled = true;
        citySelect.disabled = true;
        countrySelect.innerHTML = `<option value="">${t('select-country')}</option>`;
        citySelect.innerHTML = `<option value="">${t('select-city-option')}</option>`;
        return;
    }

    const countries = getCountries(continent);
    countrySelect.innerHTML = `<option value="">${t('select-country')}</option>`;
    countries.forEach(country => {
        const option = document.createElement('option');
        option.value = country;
        option.textContent = t(country);
        countrySelect.appendChild(option);
    });

    countrySelect.disabled = false;
    citySelect.disabled = true;
    citySelect.innerHTML = `<option value="">${t('select-city-option')}</option>`;
});

// 国家选择变化
countrySelect.addEventListener('change', (e) => {
    const country = e.target.value;
    const continent = continentSelect.value;

    if (!country) {
        citySelect.disabled = true;
        citySelect.innerHTML = `<option value="">${t('select-city-option')}</option>`;
        return;
    }

    const citiesList = getCities(continent, country);
    citySelect.innerHTML = `<option value="">${t('select-city-option')}</option>`;
    citiesList.forEach(city => {
        const option = document.createElement('option');
        option.value = JSON.stringify(city);
        option.textContent = currentLang === 'zh' ? city.nameCN : city.name;
        citySelect.appendChild(option);
    });

    citySelect.disabled = false;
});

// 城市选择变化
citySelect.addEventListener('change', (e) => {
    const cityData = e.target.value;
    if (!cityData) return;

    const city = JSON.parse(cityData);
    selectCity(city);
});

// 城市搜索过滤
citySearch.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase().trim();

    if (searchTerm.length < 2) {
        citySuggestions.innerHTML = '';
        return;
    }

    const results = searchCities(searchTerm);
    displaySearchResults(results);
});

function displaySearchResults(results) {
    if (results.length === 0) {
        citySuggestions.innerHTML = `<div style="text-align: center; color: var(--text-secondary-day); padding: 20px;">无匹配结果</div>`;
        return;
    }

    citySuggestions.innerHTML = results
        .slice(0, 20) // 限制显示20个结果
        .map(city => {
            const displayName = currentLang === 'zh'
                ? `${city.nameCN} (${city.country})`
                : `${city.name} (${city.country})`;
            return `<div class="city-option" data-city='${JSON.stringify(city)}'>${displayName}</div>`;
        })
        .join('');

    // 添加点击事件
    citySuggestions.querySelectorAll('.city-option').forEach(option => {
        option.addEventListener('click', (e) => {
            const cityData = JSON.parse(e.target.dataset.city);
            selectCity(cityData);
        });
    });
}

function selectCity(city) {
    cities.local.name = city.name;
    cities.local.nameCN = city.nameCN;
    cities.local.lat = city.lat;
    cities.local.lon = city.lon;
    cities.local.timezone = city.timezone;

    const displayName = currentLang === 'zh' ? city.nameCN : city.name;
    document.getElementById('local-city-name').textContent = displayName;

    fetchWeather('local', city.lat, city.lon);
    cityModal.classList.remove('active');

    // 保存到本地存储
    localStorage.setItem('selectedCity', JSON.stringify(city));
}

// 加载保存的城市
function loadSavedCity() {
    const savedCity = localStorage.getItem('selectedCity');
    if (savedCity) {
        const city = JSON.parse(savedCity);
        cities.local = city;
        const displayName = currentLang === 'zh' ? city.nameCN : city.name;
        document.getElementById('local-city-name').textContent = displayName;
    }
}

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

// 开始
startBtn.addEventListener('click', () => {
    if (timerState.mode === 'countdown' && !timerState.isPaused) {
        const hours = parseInt(document.getElementById('hours-input').value) || 0;
        const minutes = parseInt(document.getElementById('minutes-input').value) || 0;
        const seconds = parseInt(document.getElementById('seconds-input').value) || 0;

        timerState.targetSeconds = hours * 3600 + minutes * 60 + seconds;

        if (timerState.targetSeconds === 0) {
            alert(currentLang === 'zh' ? '请设置倒计时时间' : 'Please set countdown time');
            return;
        }

        timerState.seconds = timerState.targetSeconds;
    }

    startTimer();
});

// 暂停
pauseBtn.addEventListener('click', () => {
    pauseTimer();
});

// 停止（正计时专用）
stopBtn.addEventListener('click', () => {
    stopTimer();
});

// 重置
resetBtn.addEventListener('click', () => {
    stopTimer();
    timerState.seconds = 0;
    timerState.isPaused = false;
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
    console.log('API Key已配置');
}

// 页面加载完成后初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
