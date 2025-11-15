// 全球城市数据 - 按洲 > 国家 > 城市三级组织
const globalCitiesData = {
    'Asia': {
        'China': [
            { name: 'Beijing', nameCN: '北京', lat: 39.9042, lon: 116.4074, timezone: 'Asia/Shanghai' },
            { name: 'Shanghai', nameCN: '上海', lat: 31.2304, lon: 121.4737, timezone: 'Asia/Shanghai' },
            { name: 'Guangzhou', nameCN: '广州', lat: 23.1291, lon: 113.2644, timezone: 'Asia/Shanghai' },
            { name: 'Shenzhen', nameCN: '深圳', lat: 22.5431, lon: 114.0579, timezone: 'Asia/Shanghai' },
            { name: 'Chengdu', nameCN: '成都', lat: 30.5728, lon: 104.0668, timezone: 'Asia/Shanghai' },
            { name: 'Hangzhou', nameCN: '杭州', lat: 30.2741, lon: 120.1551, timezone: 'Asia/Shanghai' },
            { name: 'Chongqing', nameCN: '重庆', lat: 29.4316, lon: 106.9123, timezone: 'Asia/Shanghai' },
            { name: 'Xi\'an', nameCN: '西安', lat: 34.2658, lon: 108.9541, timezone: 'Asia/Shanghai' },
            { name: 'Wuhan', nameCN: '武汉', lat: 30.5928, lon: 114.3055, timezone: 'Asia/Shanghai' },
            { name: 'Nanjing', nameCN: '南京', lat: 32.0603, lon: 118.7969, timezone: 'Asia/Shanghai' },
            { name: 'Tianjin', nameCN: '天津', lat: 39.3434, lon: 117.3616, timezone: 'Asia/Shanghai' },
            { name: 'Suzhou', nameCN: '苏州', lat: 31.2989, lon: 120.5853, timezone: 'Asia/Shanghai' },
            { name: 'Qingdao', nameCN: '青岛', lat: 36.0671, lon: 120.3826, timezone: 'Asia/Shanghai' },
            { name: 'Dalian', nameCN: '大连', lat: 38.9140, lon: 121.6147, timezone: 'Asia/Shanghai' },
            { name: 'Xiamen', nameCN: '厦门', lat: 24.4798, lon: 118.0894, timezone: 'Asia/Shanghai' }
        ],
        'Japan': [
            { name: 'Tokyo', nameCN: '东京', lat: 35.6762, lon: 139.6503, timezone: 'Asia/Tokyo' },
            { name: 'Osaka', nameCN: '大阪', lat: 34.6937, lon: 135.5023, timezone: 'Asia/Tokyo' },
            { name: 'Kyoto', nameCN: '京都', lat: 35.0116, lon: 135.7681, timezone: 'Asia/Tokyo' },
            { name: 'Yokohama', nameCN: '横滨', lat: 35.4437, lon: 139.6380, timezone: 'Asia/Tokyo' },
            { name: 'Nagoya', nameCN: '名古屋', lat: 35.1815, lon: 136.9066, timezone: 'Asia/Tokyo' }
        ],
        'South Korea': [
            { name: 'Seoul', nameCN: '首尔', lat: 37.5665, lon: 126.9780, timezone: 'Asia/Seoul' },
            { name: 'Busan', nameCN: '釜山', lat: 35.1796, lon: 129.0756, timezone: 'Asia/Seoul' },
            { name: 'Incheon', nameCN: '仁川', lat: 37.4563, lon: 126.7052, timezone: 'Asia/Seoul' }
        ],
        'Singapore': [
            { name: 'Singapore', nameCN: '新加坡', lat: 1.3521, lon: 103.8198, timezone: 'Asia/Singapore' }
        ],
        'Thailand': [
            { name: 'Bangkok', nameCN: '曼谷', lat: 13.7563, lon: 100.5018, timezone: 'Asia/Bangkok' },
            { name: 'Chiang Mai', nameCN: '清迈', lat: 18.7883, lon: 98.9853, timezone: 'Asia/Bangkok' }
        ],
        'Malaysia': [
            { name: 'Kuala Lumpur', nameCN: '吉隆坡', lat: 3.1390, lon: 101.6869, timezone: 'Asia/Kuala_Lumpur' }
        ],
        'Indonesia': [
            { name: 'Jakarta', nameCN: '雅加达', lat: -6.2088, lon: 106.8456, timezone: 'Asia/Jakarta' },
            { name: 'Bali', nameCN: '巴厘岛', lat: -8.3405, lon: 115.0920, timezone: 'Asia/Makassar' }
        ],
        'India': [
            { name: 'Mumbai', nameCN: '孟买', lat: 19.0760, lon: 72.8777, timezone: 'Asia/Kolkata' },
            { name: 'New Delhi', nameCN: '新德里', lat: 28.6139, lon: 77.2090, timezone: 'Asia/Kolkata' },
            { name: 'Bangalore', nameCN: '班加罗尔', lat: 12.9716, lon: 77.5946, timezone: 'Asia/Kolkata' }
        ],
        'Russia': [
            { name: 'Moscow', nameCN: '莫斯科', lat: 55.7558, lon: 37.6173, timezone: 'Europe/Moscow' },
            { name: 'Saint Petersburg', nameCN: '圣彼得堡', lat: 59.9343, lon: 30.3351, timezone: 'Europe/Moscow' }
        ]
    },
    'Europe': {
        'France': [
            { name: 'Paris', nameCN: '巴黎', lat: 48.8566, lon: 2.3522, timezone: 'Europe/Paris' },
            { name: 'Lyon', nameCN: '里昂', lat: 45.7640, lon: 4.8357, timezone: 'Europe/Paris' },
            { name: 'Marseille', nameCN: '马赛', lat: 43.2965, lon: 5.3698, timezone: 'Europe/Paris' }
        ],
        'United Kingdom': [
            { name: 'London', nameCN: '伦敦', lat: 51.5074, lon: -0.1278, timezone: 'Europe/London' },
            { name: 'Manchester', nameCN: '曼彻斯特', lat: 53.4808, lon: -2.2426, timezone: 'Europe/London' },
            { name: 'Edinburgh', nameCN: '爱丁堡', lat: 55.9533, lon: -3.1883, timezone: 'Europe/London' }
        ],
        'Germany': [
            { name: 'Berlin', nameCN: '柏林', lat: 52.5200, lon: 13.4050, timezone: 'Europe/Berlin' },
            { name: 'Munich', nameCN: '慕尼黑', lat: 48.1351, lon: 11.5820, timezone: 'Europe/Berlin' },
            { name: 'Frankfurt', nameCN: '法兰克福', lat: 50.1109, lon: 8.6821, timezone: 'Europe/Berlin' }
        ],
        'Italy': [
            { name: 'Rome', nameCN: '罗马', lat: 41.9028, lon: 12.4964, timezone: 'Europe/Rome' },
            { name: 'Milan', nameCN: '米兰', lat: 45.4642, lon: 9.1900, timezone: 'Europe/Rome' },
            { name: 'Venice', nameCN: '威尼斯', lat: 45.4408, lon: 12.3155, timezone: 'Europe/Rome' }
        ],
        'Spain': [
            { name: 'Madrid', nameCN: '马德里', lat: 40.4168, lon: -3.7038, timezone: 'Europe/Madrid' },
            { name: 'Barcelona', nameCN: '巴塞罗那', lat: 41.3851, lon: 2.1734, timezone: 'Europe/Madrid' }
        ],
        'Netherlands': [
            { name: 'Amsterdam', nameCN: '阿姆斯特丹', lat: 52.3676, lon: 4.9041, timezone: 'Europe/Amsterdam' }
        ],
        'Switzerland': [
            { name: 'Zurich', nameCN: '苏黎世', lat: 47.3769, lon: 8.5417, timezone: 'Europe/Zurich' },
            { name: 'Geneva', nameCN: '日内瓦', lat: 46.2044, lon: 6.1432, timezone: 'Europe/Zurich' }
        ]
    },
    'North America': {
        'United States': [
            { name: 'New York', nameCN: '纽约', lat: 40.7128, lon: -74.0060, timezone: 'America/New_York' },
            { name: 'Los Angeles', nameCN: '洛杉矶', lat: 34.0522, lon: -118.2437, timezone: 'America/Los_Angeles' },
            { name: 'Chicago', nameCN: '芝加哥', lat: 41.8781, lon: -87.6298, timezone: 'America/Chicago' },
            { name: 'San Francisco', nameCN: '旧金山', lat: 37.7749, lon: -122.4194, timezone: 'America/Los_Angeles' },
            { name: 'Seattle', nameCN: '西雅图', lat: 47.6062, lon: -122.3321, timezone: 'America/Los_Angeles' },
            { name: 'Boston', nameCN: '波士顿', lat: 42.3601, lon: -71.0589, timezone: 'America/New_York' },
            { name: 'Washington DC', nameCN: '华盛顿', lat: 38.9072, lon: -77.0369, timezone: 'America/New_York' },
            { name: 'Miami', nameCN: '迈阿密', lat: 25.7617, lon: -80.1918, timezone: 'America/New_York' },
            { name: 'Las Vegas', nameCN: '拉斯维加斯', lat: 36.1699, lon: -115.1398, timezone: 'America/Los_Angeles' }
        ],
        'Canada': [
            { name: 'Toronto', nameCN: '多伦多', lat: 43.6532, lon: -79.3832, timezone: 'America/Toronto' },
            { name: 'Vancouver', nameCN: '温哥华', lat: 49.2827, lon: -123.1207, timezone: 'America/Vancouver' },
            { name: 'Montreal', nameCN: '蒙特利尔', lat: 45.5017, lon: -73.5673, timezone: 'America/Toronto' }
        ],
        'Mexico': [
            { name: 'Mexico City', nameCN: '墨西哥城', lat: 19.4326, lon: -99.1332, timezone: 'America/Mexico_City' }
        ]
    },
    'South America': {
        'Brazil': [
            { name: 'São Paulo', nameCN: '圣保罗', lat: -23.5505, lon: -46.6333, timezone: 'America/Sao_Paulo' },
            { name: 'Rio de Janeiro', nameCN: '里约热内卢', lat: -22.9068, lon: -43.1729, timezone: 'America/Sao_Paulo' }
        ],
        'Argentina': [
            { name: 'Buenos Aires', nameCN: '布宜诺斯艾利斯', lat: -34.6037, lon: -58.3816, timezone: 'America/Argentina/Buenos_Aires' }
        ]
    },
    'Africa': {
        'South Africa': [
            { name: 'Cape Town', nameCN: '开普敦', lat: -33.9249, lon: 18.4241, timezone: 'Africa/Johannesburg' },
            { name: 'Johannesburg', nameCN: '约翰内斯堡', lat: -26.2041, lon: 28.0473, timezone: 'Africa/Johannesburg' }
        ],
        'Egypt': [
            { name: 'Cairo', nameCN: '开罗', lat: 30.0444, lon: 31.2357, timezone: 'Africa/Cairo' }
        ]
    },
    'Oceania': {
        'Australia': [
            { name: 'Sydney', nameCN: '悉尼', lat: -33.8688, lon: 151.2093, timezone: 'Australia/Sydney' },
            { name: 'Melbourne', nameCN: '墨尔本', lat: -37.8136, lon: 144.9631, timezone: 'Australia/Melbourne' },
            { name: 'Brisbane', nameCN: '布里斯班', lat: -27.4698, lon: 153.0251, timezone: 'Australia/Brisbane' }
        ],
        'New Zealand': [
            { name: 'Auckland', nameCN: '奥克兰', lat: -36.8485, lon: 174.7633, timezone: 'Pacific/Auckland' },
            { name: 'Wellington', nameCN: '惠灵顿', lat: -41.2865, lon: 174.7762, timezone: 'Pacific/Auckland' }
        ]
    }
};

// 获取所有洲的列表
function getContinents() {
    return Object.keys(globalCitiesData).sort();
}

// 获取指定洲的国家列表
function getCountries(continent) {
    if (!globalCitiesData[continent]) return [];
    return Object.keys(globalCitiesData[continent]).sort();
}

// 获取指定国家的城市列表
function getCities(continent, country) {
    if (!globalCitiesData[continent] || !globalCitiesData[continent][country]) return [];
    return globalCitiesData[continent][country].sort((a, b) => a.name.localeCompare(b.name));
}

// 搜索城市
function searchCities(query) {
    const results = [];
    const lowerQuery = query.toLowerCase();

    for (const continent in globalCitiesData) {
        for (const country in globalCitiesData[continent]) {
            const cities = globalCitiesData[continent][country];
            cities.forEach(city => {
                if (
                    city.name.toLowerCase().includes(lowerQuery) ||
                    city.nameCN.includes(query)
                ) {
                    results.push({
                        ...city,
                        continent,
                        country
                    });
                }
            });
        }
    }

    return results;
}
