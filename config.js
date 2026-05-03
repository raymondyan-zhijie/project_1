// OpenWeatherMap API 配置
// 请替换为你的 OpenWeatherMap API Key（免费注册: https://openweathermap.org/api）
const API_KEY = 'YOUR_API_KEY_HERE';
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
    },
    tokyo: {
        name: 'Tokyo',
        nameCN: '东京',
        lat: 35.6762,
        lon: 139.6503,
        timezone: 'Asia/Tokyo'
    },
    london: {
        name: 'London',
        nameCN: '伦敦',
        lat: 51.5074,
        lon: -0.1278,
        timezone: 'Europe/London'
    },
    sydney: {
        name: 'Sydney',
        nameCN: '悉尼',
        lat: -33.8688,
        lon: 151.2093,
        timezone: 'Australia/Sydney'
    },
    dubai: {
        name: 'Dubai',
        nameCN: '迪拜',
        lat: 25.2048,
        lon: 55.2708,
        timezone: 'Asia/Dubai'
    },
    singapore: {
        name: 'Singapore',
        nameCN: '新加坡',
        lat: 1.3521,
        lon: 103.8198,
        timezone: 'Asia/Singapore'
    },
    hongkong: {
        name: 'Hong Kong',
        nameCN: '香港',
        lat: 22.3193,
        lon: 114.1694,
        timezone: 'Asia/Hong_Kong'
    },
    losangeles: {
        name: 'Los Angeles',
        nameCN: '洛杉矶',
        lat: 34.0522,
        lon: -118.2437,
        timezone: 'America/Los_Angeles'
    },
    moscow: {
        name: 'Moscow',
        nameCN: '莫斯科',
        lat: 55.7558,
        lon: 37.6173,
        timezone: 'Europe/Moscow'
    }
};

// 日出日落数据缓存键名
const SUNRISE_SUNSET_CACHE_KEY = 'sunriseSunsetCache';

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
    mode: 'stopwatch',
    isRunning: false,
    isPaused: false,
    seconds: 0,
    targetSeconds: 0,
    interval: null,
    laps: []
};
