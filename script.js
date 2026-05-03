// ============ 语言切换功能 ============

document.addEventListener('DOMContentLoaded', () => {
    updateTranslations();

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            switchLanguage(lang);
        });
    });
});

// ============ 时间和日期显示功能 ============

function getTimezoneOffset(timezone) {
    const now = new Date();
    const utcDate = new Date(now.toLocaleString('en-US', { timeZone: 'UTC' }));
    const tzDate = new Date(now.toLocaleString('en-US', { timeZone: timezone }));
    const offset = (tzDate.getTime() - utcDate.getTime()) / (1000 * 60 * 60);

    const hours = Math.floor(Math.abs(offset));
    const minutes = Math.abs((offset % 1) * 60);

    const sign = offset >= 0 ? '+' : '-';
    if (minutes === 0) {
        return `UTC${sign}${hours}`;
    } else {
        return `UTC${sign}${hours}:${minutes.toString().padStart(2, '0')}`;
    }
}

function updateTime() {
    updateCityTime('local', cities.local.timezone);
    updateCityTime('paris', cities.paris.timezone);
    updateCityTime('newyork', cities.newyork.timezone);
    updateCityTime('shanghai', cities.shanghai.timezone);
}

function updateCityTime(cityKey, timezone) {
    const timeElement = document.getElementById(`${cityKey}-time`);
    const dateElement = document.getElementById(`${cityKey}-date`);
    const timezoneElement = document.getElementById(`${cityKey}-timezone`);
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

    if (timezoneElement) {
        timezoneElement.textContent = getTimezoneOffset(timezone);
    }
}

// ============ 城市选择功能 ============

const cityModal = document.getElementById('city-modal');
const selectCityBtn = document.getElementById('select-city-btn');
const closeModalBtn = document.getElementById('close-modal');
const citySearch = document.getElementById('city-search');
const citySuggestions = document.getElementById('city-suggestions');

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

citySelect.addEventListener('change', (e) => {
    const cityData = e.target.value;
    if (!cityData) return;

    const city = JSON.parse(cityData);
    selectCity(city);
});

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
        .slice(0, 20)
        .map(city => {
            const displayName = currentLang === 'zh'
                ? `${city.nameCN} (${city.country})`
                : `${city.name} (${city.country})`;
            return `<div class="city-option" data-city='${JSON.stringify(city)}'>${displayName}</div>`;
        })
        .join('');

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

    localStorage.setItem('selectedCity', JSON.stringify(city));
}

function loadSavedCity() {
    const savedCity = localStorage.getItem('selectedCity');
    if (savedCity) {
        const city = JSON.parse(savedCity);
        cities.local = city;
        const displayName = currentLang === 'zh' ? city.nameCN : city.name;
        document.getElementById('local-city-name').textContent = displayName;
    }
}

// ============ 初始化 ============

function init() {
    loadSavedCity();

    updateTime();
    const msToNextSecond = 1000 - (Date.now() % 1000);
    setTimeout(() => {
        updateTime();
        setInterval(updateTime, 1000);
    }, msToNextSecond);

    initOfflineDayNightTheme();

    updateAllWeather();
    setInterval(updateAllWeather, 600000);

    updateTimerDisplay();
    updateLapsDisplay();

    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('sw.js');
    }

    console.log('应用初始化完成');
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}
