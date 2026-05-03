// ============ 日出日落数据本地缓存管理 ============

function saveSunriseSunsetData(cityKey, sunrise, sunset) {
    try {
        const cache = JSON.parse(localStorage.getItem(SUNRISE_SUNSET_CACHE_KEY) || '{}');
        const today = new Date().toISOString().split('T')[0];

        cache[cityKey] = {
            sunrise: sunrise,
            sunset: sunset,
            date: today,
            timestamp: Date.now()
        };

        localStorage.setItem(SUNRISE_SUNSET_CACHE_KEY, JSON.stringify(cache));
        console.log(`已缓存 ${cityKey} 的日出日落数据`);
    } catch (error) {
        console.error('保存日出日落数据失败:', error);
    }
}

function loadSunriseSunsetData(cityKey) {
    try {
        const cache = JSON.parse(localStorage.getItem(SUNRISE_SUNSET_CACHE_KEY) || '{}');
        const data = cache[cityKey];

        if (!data) {
            return null;
        }

        const daysSinceCache = (Date.now() - data.timestamp) / (1000 * 60 * 60 * 24);

        if (daysSinceCache > 7) {
            console.log(`${cityKey} 的缓存数据已过期 (${Math.floor(daysSinceCache)} 天)，但仍可用于离线模式`);
        }

        return data;
    } catch (error) {
        console.error('读取日出日落数据失败:', error);
        return null;
    }
}

function clearSunriseSunsetCache() {
    try {
        localStorage.removeItem(SUNRISE_SUNSET_CACHE_KEY);
        console.log('已清除所有日出日落缓存数据');
    } catch (error) {
        console.error('清除缓存失败:', error);
    }
}

function getCachedCities() {
    try {
        const cache = JSON.parse(localStorage.getItem(SUNRISE_SUNSET_CACHE_KEY) || '{}');
        return Object.keys(cache);
    } catch (error) {
        console.error('获取缓存城市列表失败:', error);
        return [];
    }
}

// ============ 天气数据获取 ============

const pendingRequests = new Set();

async function fetchWeather(cityKey, lat, lon) {
    if (pendingRequests.has(cityKey)) return;
    pendingRequests.add(cityKey);

    try {
        const weatherResponse = await fetch(
            `${API_BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=${currentLang === 'zh' ? 'zh_cn' : 'en'}`
        );
        if (!weatherResponse.ok) {
            throw new Error(`Weather API returned ${weatherResponse.status}: ${weatherResponse.statusText}`);
        }
        const weatherData = await weatherResponse.json();

        const aqiResponse = await fetch(
            `${API_BASE_URL}/air_pollution?lat=${lat}&lon=${lon}&appid=${API_KEY}`
        );
        if (!aqiResponse.ok) {
            throw new Error(`AQI API returned ${aqiResponse.status}: ${aqiResponse.statusText}`);
        }
        const aqiData = await aqiResponse.json();

        updateWeatherDisplay(cityKey, weatherData, aqiData);
        saveSunriseSunsetData(cityKey, weatherData.sys.sunrise, weatherData.sys.sunset);
        updateDayNightTheme(cityKey, weatherData.sys.sunrise, weatherData.sys.sunset);
    } catch (error) {
        console.error(`获取 ${cityKey} 天气数据失败:`, error);
        showWeatherError(cityKey);
    } finally {
        pendingRequests.delete(cityKey);
    }
}

function updateWeatherDisplay(cityKey, weatherData, aqiData) {
    document.getElementById(`${cityKey}-temp`).textContent =
        `${Math.round(weatherData.main.temp)}°C`;

    document.getElementById(`${cityKey}-desc`).textContent =
        weatherData.weather[0].description;

    const iconCode = weatherData.weather[0].icon;
    document.getElementById(`${cityKey}-weather-icon`).textContent =
        weatherIcons[iconCode] || '🌤️';

    document.getElementById(`${cityKey}-humidity`).textContent =
        `${weatherData.main.humidity}%`;

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
    if (API_KEY === 'YOUR_API_KEY_HERE' || !API_KEY) {
        showApiKeyWarning();
        return;
    }
    fetchWeather('local', cities.local.lat, cities.local.lon);
    fetchWeather('paris', cities.paris.lat, cities.paris.lon);
    fetchWeather('newyork', cities.newyork.lat, cities.newyork.lon);
    fetchWeather('shanghai', cities.shanghai.lat, cities.shanghai.lon);
}

function showApiKeyWarning() {
    ['local', 'paris', 'newyork', 'shanghai'].forEach(key => {
        document.getElementById(`${key}-desc`).textContent =
            currentLang === 'zh' ? '请配置 API Key' : 'Please set API Key';
    });
}

// ============ 日夜主题切换 ============

function updateDayNightTheme(cityKey, sunrise, sunset) {
    const cityCard = document.getElementById(`${cityKey}-card`);

    if (sunrise && sunset) {
        const now = Math.floor(Date.now() / 1000);
        const isNight = now < sunrise || now > sunset;

        if (isNight) {
            cityCard.classList.add('night-theme');
        } else {
            cityCard.classList.remove('night-theme');
        }
    } else {
        updateDayNightThemeOffline(cityKey);
    }
}

function updateDayNightThemeOffline(cityKey) {
    const cityCard = document.getElementById(`${cityKey}-card`);
    const cityConfig = cities[cityKey];

    if (!cityConfig) return;

    const cachedData = loadSunriseSunsetData(cityKey);

    if (cachedData) {
        const now = Math.floor(Date.now() / 1000);
        const isNight = now < cachedData.sunrise || now > cachedData.sunset;

        if (isNight) {
            cityCard.classList.add('night-theme');
        } else {
            cityCard.classList.remove('night-theme');
        }

        console.log(`${cityKey} 使用缓存数据判断白天黑夜 (缓存日期: ${cachedData.date})`);
    } else {
        const now = new Date();
        const localTime = new Date(now.toLocaleString('en-US', { timeZone: cityConfig.timezone }));
        const hour = localTime.getHours();

        const isNight = hour < 6 || hour >= 18;

        if (isNight) {
            cityCard.classList.add('night-theme');
        } else {
            cityCard.classList.remove('night-theme');
        }

        console.log(`${cityKey} 使用简化时间判断白天黑夜 (无缓存数据)`);
    }
}

function initOfflineDayNightTheme() {
    updateDayNightThemeOffline('local');
    updateDayNightThemeOffline('paris');
    updateDayNightThemeOffline('newyork');
    updateDayNightThemeOffline('shanghai');
}
