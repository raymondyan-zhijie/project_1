// 多语言翻译数据
const translations = {
    zh: {
        'page-title': '时间天气仪表盘',
        'app-title': '全球时间与天气',
        'select-city': '选择城市',
        'loading': '加载中...',
        'humidity': '湿度',
        'air-quality': '空气质量',
        'timer': '计时器',
        'stopwatch': '正计时',
        'countdown': '倒计时',
        'start': '开始',
        'pause': '暂停',
        'stop': '停止',
        'reset': '重置',
        'lap': '计圈',
        'lap-records': '计圈记录',
        'search-city': '搜索城市...',
        'select-continent': '选择时区',
        'select-country': '选择国家',
        'select-city-option': '选择城市',
        'no-laps': '暂无计圈记录',
        'lap-number': '第 {n} 圈',
        'lap-time': '阶段',
        'total-time': '累计',
        // 空气质量等级
        'aqi-excellent': '优秀',
        'aqi-good': '良好',
        'aqi-moderate': '中等',
        'aqi-poor': '较差',
        'aqi-very-poor': '差',
        // 洲名
        'Asia': '亚洲',
        'Europe': '欧洲',
        'North America': '北美洲',
        'South America': '南美洲',
        'Africa': '非洲',
        'Oceania': '大洋洲',
        // 常用国家
        'China': '中国',
        'United States': '美国',
        'France': '法国',
        'Japan': '日本',
        'United Kingdom': '英国',
        'Germany': '德国',
        'Australia': '澳大利亚',
        'Canada': '加拿大',
        'Brazil': '巴西',
        'India': '印度',
        'South Korea': '韩国',
        'Singapore': '新加坡',
        'Thailand': '泰国',
        'Malaysia': '马来西亚',
        'Indonesia': '印度尼西亚',
        'Russia': '俄罗斯',
        'Italy': '意大利',
        'Spain': '西班牙',
        'Netherlands': '荷兰',
        'Switzerland': '瑞士',
        'Mexico': '墨西哥',
        'Argentina': '阿根廷',
        'South Africa': '南非',
        'Egypt': '埃及',
        'New Zealand': '新西兰'
    },
    en: {
        'page-title': 'Time & Weather Dashboard',
        'app-title': 'Global Time & Weather',
        'select-city': 'Select City',
        'loading': 'Loading...',
        'humidity': 'Humidity',
        'air-quality': 'Air Quality',
        'timer': 'Timer',
        'stopwatch': 'Stopwatch',
        'countdown': 'Countdown',
        'start': 'Start',
        'pause': 'Pause',
        'stop': 'Stop',
        'reset': 'Reset',
        'lap': 'Lap',
        'lap-records': 'Lap Records',
        'search-city': 'Search city...',
        'select-continent': 'Select Timezone',
        'select-country': 'Select Country',
        'select-city-option': 'Select City',
        'no-laps': 'No lap records',
        'lap-number': 'Lap {n}',
        'lap-time': 'Split',
        'total-time': 'Total',
        // 空气质量等级
        'aqi-excellent': 'Excellent',
        'aqi-good': 'Good',
        'aqi-moderate': 'Moderate',
        'aqi-poor': 'Poor',
        'aqi-very-poor': 'Very Poor',
        // 洲名 (保持英文)
        'Asia': 'Asia',
        'Europe': 'Europe',
        'North America': 'North America',
        'South America': 'South America',
        'Africa': 'Africa',
        'Oceania': 'Oceania',
        // 常用国家 (保持英文)
        'China': 'China',
        'United States': 'United States',
        'France': 'France',
        'Japan': 'Japan',
        'United Kingdom': 'United Kingdom',
        'Germany': 'Germany',
        'Australia': 'Australia',
        'Canada': 'Canada',
        'Brazil': 'Brazil',
        'India': 'India',
        'South Korea': 'South Korea',
        'Singapore': 'Singapore',
        'Thailand': 'Thailand',
        'Malaysia': 'Malaysia',
        'Indonesia': 'Indonesia',
        'Russia': 'Russia',
        'Italy': 'Italy',
        'Spain': 'Spain',
        'Netherlands': 'Netherlands',
        'Switzerland': 'Switzerland',
        'Mexico': 'Mexico',
        'Argentina': 'Argentina',
        'South Africa': 'South Africa',
        'Egypt': 'Egypt',
        'New Zealand': 'New Zealand'
    }
};

// 当前语言
let currentLang = localStorage.getItem('language') || 'zh';

// 翻译函数
function t(key) {
    return translations[currentLang][key] || key;
}

// 更新页面所有翻译
function updateTranslations() {
    // 更新所有带 data-i18n 属性的元素
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translation = t(key);

        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            element.value = translation;
        } else {
            element.textContent = translation;
        }
    });

    // 更新 placeholder
    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        element.placeholder = t(key);
    });

    // 更新页面标题
    document.title = t('page-title');
}

// 切换语言
function switchLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('language', lang);
    updateTranslations();

    // 更新语言按钮状态
    document.querySelectorAll('.lang-btn').forEach(btn => {
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}
