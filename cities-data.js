// 全球城市数据 - 按UTC时区组织，确保每个时区都有代表城市
// 数据结构：每个城市包含 UTC偏移值用于排序

const globalCitiesData = {
    // UTC-12 to UTC-11
    'UTC-12': {
        'United States': [
            { name: 'Baker Island', nameCN: '贝克岛', lat: 0.1936, lon: -176.4769, timezone: 'Etc/GMT+12', utcOffset: -12 }
        ]
    },
    'UTC-11': {
        'American Samoa': [
            { name: 'Pago Pago', nameCN: '帕果帕果', lat: -14.2756, lon: -170.7022, timezone: 'Pacific/Pago_Pago', utcOffset: -11 }
        ]
    },
    'UTC-10': {
        'United States': [
            { name: 'Honolulu', nameCN: '檀香山', lat: 21.3099, lon: -157.8581, timezone: 'Pacific/Honolulu', utcOffset: -10 }
        ]
    },
    'UTC-9': {
        'United States': [
            { name: 'Anchorage', nameCN: '安克雷奇', lat: 61.2181, lon: -149.9003, timezone: 'America/Anchorage', utcOffset: -9 }
        ]
    },
    'UTC-8': {
        'United States': [
            { name: 'Los Angeles', nameCN: '洛杉矶', lat: 34.0522, lon: -118.2437, timezone: 'America/Los_Angeles', utcOffset: -8 },
            { name: 'San Francisco', nameCN: '旧金山', lat: 37.7749, lon: -122.4194, timezone: 'America/Los_Angeles', utcOffset: -8 },
            { name: 'Seattle', nameCN: '西雅图', lat: 47.6062, lon: -122.3321, timezone: 'America/Los_Angeles', utcOffset: -8 },
            { name: 'Las Vegas', nameCN: '拉斯维加斯', lat: 36.1699, lon: -115.1398, timezone: 'America/Los_Angeles', utcOffset: -8 }
        ],
        'Canada': [
            { name: 'Vancouver', nameCN: '温哥华', lat: 49.2827, lon: -123.1207, timezone: 'America/Vancouver', utcOffset: -8 }
        ],
        'Mexico': [
            { name: 'Tijuana', nameCN: '蒂华纳', lat: 32.5149, lon: -117.0382, timezone: 'America/Tijuana', utcOffset: -8 }
        ]
    },
    'UTC-7': {
        'United States': [
            { name: 'Denver', nameCN: '丹佛', lat: 39.7392, lon: -104.9903, timezone: 'America/Denver', utcOffset: -7 },
            { name: 'Phoenix', nameCN: '凤凰城', lat: 33.4484, lon: -112.0740, timezone: 'America/Phoenix', utcOffset: -7 }
        ],
        'Canada': [
            { name: 'Calgary', nameCN: '卡尔加里', lat: 51.0447, lon: -114.0719, timezone: 'America/Edmonton', utcOffset: -7 }
        ],
        'Mexico': [
            { name: 'Chihuahua', nameCN: '奇瓦瓦', lat: 28.6353, lon: -106.0889, timezone: 'America/Chihuahua', utcOffset: -7 }
        ]
    },
    'UTC-6': {
        'United States': [
            { name: 'Chicago', nameCN: '芝加哥', lat: 41.8781, lon: -87.6298, timezone: 'America/Chicago', utcOffset: -6 },
            { name: 'Houston', nameCN: '休斯顿', lat: 29.7604, lon: -95.3698, timezone: 'America/Chicago', utcOffset: -6 },
            { name: 'Dallas', nameCN: '达拉斯', lat: 32.7767, lon: -96.7970, timezone: 'America/Chicago', utcOffset: -6 }
        ],
        'Mexico': [
            { name: 'Mexico City', nameCN: '墨西哥城', lat: 19.4326, lon: -99.1332, timezone: 'America/Mexico_City', utcOffset: -6 }
        ],
        'Canada': [
            { name: 'Winnipeg', nameCN: '温尼伯', lat: 49.8951, lon: -97.1384, timezone: 'America/Winnipeg', utcOffset: -6 }
        ]
    },
    'UTC-5': {
        'United States': [
            { name: 'New York', nameCN: '纽约', lat: 40.7128, lon: -74.0060, timezone: 'America/New_York', utcOffset: -5 },
            { name: 'Washington DC', nameCN: '华盛顿', lat: 38.9072, lon: -77.0369, timezone: 'America/New_York', utcOffset: -5 },
            { name: 'Boston', nameCN: '波士顿', lat: 42.3601, lon: -71.0589, timezone: 'America/New_York', utcOffset: -5 },
            { name: 'Miami', nameCN: '迈阿密', lat: 25.7617, lon: -80.1918, timezone: 'America/New_York', utcOffset: -5 },
            { name: 'Philadelphia', nameCN: '费城', lat: 39.9526, lon: -75.1652, timezone: 'America/New_York', utcOffset: -5 }
        ],
        'Canada': [
            { name: 'Toronto', nameCN: '多伦多', lat: 43.6532, lon: -79.3832, timezone: 'America/Toronto', utcOffset: -5 },
            { name: 'Montreal', nameCN: '蒙特利尔', lat: 45.5017, lon: -73.5673, timezone: 'America/Toronto', utcOffset: -5 }
        ],
        'Colombia': [
            { name: 'Bogotá', nameCN: '波哥大', lat: 4.7110, lon: -74.0721, timezone: 'America/Bogota', utcOffset: -5 }
        ],
        'Peru': [
            { name: 'Lima', nameCN: '利马', lat: -12.0464, lon: -77.0428, timezone: 'America/Lima', utcOffset: -5 }
        ]
    },
    'UTC-4': {
        'Venezuela': [
            { name: 'Caracas', nameCN: '加拉加斯', lat: 10.4806, lon: -66.9036, timezone: 'America/Caracas', utcOffset: -4 }
        ],
        'Chile': [
            { name: 'Santiago', nameCN: '圣地亚哥', lat: -33.4489, lon: -70.6693, timezone: 'America/Santiago', utcOffset: -4 }
        ],
        'Canada': [
            { name: 'Halifax', nameCN: '哈利法克斯', lat: 44.6488, lon: -63.5752, timezone: 'America/Halifax', utcOffset: -4 }
        ]
    },
    'UTC-3': {
        'Brazil': [
            { name: 'São Paulo', nameCN: '圣保罗', lat: -23.5505, lon: -46.6333, timezone: 'America/Sao_Paulo', utcOffset: -3 },
            { name: 'Rio de Janeiro', nameCN: '里约热内卢', lat: -22.9068, lon: -43.1729, timezone: 'America/Sao_Paulo', utcOffset: -3 },
            { name: 'Brasília', nameCN: '巴西利亚', lat: -15.8267, lon: -47.9218, timezone: 'America/Sao_Paulo', utcOffset: -3 }
        ],
        'Argentina': [
            { name: 'Buenos Aires', nameCN: '布宜诺斯艾利斯', lat: -34.6037, lon: -58.3816, timezone: 'America/Argentina/Buenos_Aires', utcOffset: -3 }
        ],
        'Uruguay': [
            { name: 'Montevideo', nameCN: '蒙得维的亚', lat: -34.9011, lon: -56.1645, timezone: 'America/Montevideo', utcOffset: -3 }
        ]
    },
    'UTC-2': {
        'Brazil': [
            { name: 'Fernando de Noronha', nameCN: '费尔南多-迪诺罗尼亚', lat: -3.8549, lon: -32.4231, timezone: 'America/Noronha', utcOffset: -2 }
        ]
    },
    'UTC-1': {
        'Portugal': [
            { name: 'Azores', nameCN: '亚速尔群岛', lat: 37.7412, lon: -25.6756, timezone: 'Atlantic/Azores', utcOffset: -1 }
        ],
        'Cape Verde': [
            { name: 'Praia', nameCN: '普拉亚', lat: 14.9331, lon: -23.5133, timezone: 'Atlantic/Cape_Verde', utcOffset: -1 }
        ]
    },
    'UTC+0': {
        'United Kingdom': [
            { name: 'London', nameCN: '伦敦', lat: 51.5074, lon: -0.1278, timezone: 'Europe/London', utcOffset: 0 },
            { name: 'Edinburgh', nameCN: '爱丁堡', lat: 55.9533, lon: -3.1883, timezone: 'Europe/London', utcOffset: 0 },
            { name: 'Manchester', nameCN: '曼彻斯特', lat: 53.4808, lon: -2.2426, timezone: 'Europe/London', utcOffset: 0 }
        ],
        'Portugal': [
            { name: 'Lisbon', nameCN: '里斯本', lat: 38.7223, lon: -9.1393, timezone: 'Europe/Lisbon', utcOffset: 0 }
        ],
        'Ireland': [
            { name: 'Dublin', nameCN: '都柏林', lat: 53.3498, lon: -6.2603, timezone: 'Europe/Dublin', utcOffset: 0 }
        ],
        'Iceland': [
            { name: 'Reykjavik', nameCN: '雷克雅未克', lat: 64.1466, lon: -21.9426, timezone: 'Atlantic/Reykjavik', utcOffset: 0 }
        ],
        'Ghana': [
            { name: 'Accra', nameCN: '阿克拉', lat: 5.6037, lon: -0.1870, timezone: 'Africa/Accra', utcOffset: 0 }
        ]
    },
    'UTC+1': {
        'France': [
            { name: 'Paris', nameCN: '巴黎', lat: 48.8566, lon: 2.3522, timezone: 'Europe/Paris', utcOffset: 1 },
            { name: 'Lyon', nameCN: '里昂', lat: 45.7640, lon: 4.8357, timezone: 'Europe/Paris', utcOffset: 1 },
            { name: 'Marseille', nameCN: '马赛', lat: 43.2965, lon: 5.3698, timezone: 'Europe/Paris', utcOffset: 1 }
        ],
        'Germany': [
            { name: 'Berlin', nameCN: '柏林', lat: 52.5200, lon: 13.4050, timezone: 'Europe/Berlin', utcOffset: 1 },
            { name: 'Munich', nameCN: '慕尼黑', lat: 48.1351, lon: 11.5820, timezone: 'Europe/Berlin', utcOffset: 1 },
            { name: 'Frankfurt', nameCN: '法兰克福', lat: 50.1109, lon: 8.6821, timezone: 'Europe/Berlin', utcOffset: 1 }
        ],
        'Italy': [
            { name: 'Rome', nameCN: '罗马', lat: 41.9028, lon: 12.4964, timezone: 'Europe/Rome', utcOffset: 1 },
            { name: 'Milan', nameCN: '米兰', lat: 45.4642, lon: 9.1900, timezone: 'Europe/Rome', utcOffset: 1 }
        ],
        'Spain': [
            { name: 'Madrid', nameCN: '马德里', lat: 40.4168, lon: -3.7038, timezone: 'Europe/Madrid', utcOffset: 1 },
            { name: 'Barcelona', nameCN: '巴塞罗那', lat: 41.3851, lon: 2.1734, timezone: 'Europe/Madrid', utcOffset: 1 }
        ],
        'Netherlands': [
            { name: 'Amsterdam', nameCN: '阿姆斯特丹', lat: 52.3676, lon: 4.9041, timezone: 'Europe/Amsterdam', utcOffset: 1 }
        ],
        'Belgium': [
            { name: 'Brussels', nameCN: '布鲁塞尔', lat: 50.8503, lon: 4.3517, timezone: 'Europe/Brussels', utcOffset: 1 }
        ],
        'Nigeria': [
            { name: 'Lagos', nameCN: '拉各斯', lat: 6.5244, lon: 3.3792, timezone: 'Africa/Lagos', utcOffset: 1 }
        ]
    },
    'UTC+2': {
        'South Africa': [
            { name: 'Johannesburg', nameCN: '约翰内斯堡', lat: -26.2041, lon: 28.0473, timezone: 'Africa/Johannesburg', utcOffset: 2 },
            { name: 'Cape Town', nameCN: '开普敦', lat: -33.9249, lon: 18.4241, timezone: 'Africa/Johannesburg', utcOffset: 2 }
        ],
        'Egypt': [
            { name: 'Cairo', nameCN: '开罗', lat: 30.0444, lon: 31.2357, timezone: 'Africa/Cairo', utcOffset: 2 }
        ],
        'Greece': [
            { name: 'Athens', nameCN: '雅典', lat: 37.9838, lon: 23.7275, timezone: 'Europe/Athens', utcOffset: 2 }
        ],
        'Finland': [
            { name: 'Helsinki', nameCN: '赫尔辛基', lat: 60.1699, lon: 24.9384, timezone: 'Europe/Helsinki', utcOffset: 2 }
        ],
        'Israel': [
            { name: 'Tel Aviv', nameCN: '特拉维夫', lat: 32.0853, lon: 34.7818, timezone: 'Asia/Jerusalem', utcOffset: 2 }
        ]
    },
    'UTC+3': {
        'Russia': [
            { name: 'Moscow', nameCN: '莫斯科', lat: 55.7558, lon: 37.6173, timezone: 'Europe/Moscow', utcOffset: 3 },
            { name: 'Saint Petersburg', nameCN: '圣彼得堡', lat: 59.9343, lon: 30.3351, timezone: 'Europe/Moscow', utcOffset: 3 }
        ],
        'Turkey': [
            { name: 'Istanbul', nameCN: '伊斯坦布尔', lat: 41.0082, lon: 28.9784, timezone: 'Europe/Istanbul', utcOffset: 3 },
            { name: 'Ankara', nameCN: '安卡拉', lat: 39.9334, lon: 32.8597, timezone: 'Europe/Istanbul', utcOffset: 3 }
        ],
        'Saudi Arabia': [
            { name: 'Riyadh', nameCN: '利雅得', lat: 24.7136, lon: 46.6753, timezone: 'Asia/Riyadh', utcOffset: 3 }
        ],
        'Kenya': [
            { name: 'Nairobi', nameCN: '内罗毕', lat: -1.2864, lon: 36.8172, timezone: 'Africa/Nairobi', utcOffset: 3 }
        ]
    },
    'UTC+4': {
        'United Arab Emirates': [
            { name: 'Dubai', nameCN: '迪拜', lat: 25.2048, lon: 55.2708, timezone: 'Asia/Dubai', utcOffset: 4 },
            { name: 'Abu Dhabi', nameCN: '阿布扎比', lat: 24.4539, lon: 54.3773, timezone: 'Asia/Dubai', utcOffset: 4 }
        ],
        'Armenia': [
            { name: 'Yerevan', nameCN: '埃里温', lat: 40.1792, lon: 44.4991, timezone: 'Asia/Yerevan', utcOffset: 4 }
        ]
    },
    'UTC+5': {
        'Pakistan': [
            { name: 'Karachi', nameCN: '卡拉奇', lat: 24.8607, lon: 67.0011, timezone: 'Asia/Karachi', utcOffset: 5 }
        ],
        'Uzbekistan': [
            { name: 'Tashkent', nameCN: '塔什干', lat: 41.2995, lon: 69.2401, timezone: 'Asia/Tashkent', utcOffset: 5 }
        ]
    },
    'UTC+5:30': {
        'India': [
            { name: 'Mumbai', nameCN: '孟买', lat: 19.0760, lon: 72.8777, timezone: 'Asia/Kolkata', utcOffset: 5.5 },
            { name: 'New Delhi', nameCN: '新德里', lat: 28.6139, lon: 77.2090, timezone: 'Asia/Kolkata', utcOffset: 5.5 },
            { name: 'Bangalore', nameCN: '班加罗尔', lat: 12.9716, lon: 77.5946, timezone: 'Asia/Kolkata', utcOffset: 5.5 },
            { name: 'Chennai', nameCN: '金奈', lat: 13.0827, lon: 80.2707, timezone: 'Asia/Kolkata', utcOffset: 5.5 }
        ],
        'Sri Lanka': [
            { name: 'Colombo', nameCN: '科伦坡', lat: 6.9271, lon: 79.8612, timezone: 'Asia/Colombo', utcOffset: 5.5 }
        ]
    },
    'UTC+6': {
        'Bangladesh': [
            { name: 'Dhaka', nameCN: '达卡', lat: 23.8103, lon: 90.4125, timezone: 'Asia/Dhaka', utcOffset: 6 }
        ],
        'Kazakhstan': [
            { name: 'Almaty', nameCN: '阿拉木图', lat: 43.2220, lon: 76.8512, timezone: 'Asia/Almaty', utcOffset: 6 }
        ]
    },
    'UTC+7': {
        'Thailand': [
            { name: 'Bangkok', nameCN: '曼谷', lat: 13.7563, lon: 100.5018, timezone: 'Asia/Bangkok', utcOffset: 7 }
        ],
        'Vietnam': [
            { name: 'Ho Chi Minh City', nameCN: '胡志明市', lat: 10.8231, lon: 106.6297, timezone: 'Asia/Ho_Chi_Minh', utcOffset: 7 },
            { name: 'Hanoi', nameCN: '河内', lat: 21.0285, lon: 105.8542, timezone: 'Asia/Ho_Chi_Minh', utcOffset: 7 }
        ],
        'Indonesia': [
            { name: 'Jakarta', nameCN: '雅加达', lat: -6.2088, lon: 106.8456, timezone: 'Asia/Jakarta', utcOffset: 7 }
        ]
    },
    'UTC+8': {
        'China': [
            { name: 'Beijing', nameCN: '北京', lat: 39.9042, lon: 116.4074, timezone: 'Asia/Shanghai', utcOffset: 8 },
            { name: 'Shanghai', nameCN: '上海', lat: 31.2304, lon: 121.4737, timezone: 'Asia/Shanghai', utcOffset: 8 },
            { name: 'Guangzhou', nameCN: '广州', lat: 23.1291, lon: 113.2644, timezone: 'Asia/Shanghai', utcOffset: 8 },
            { name: 'Shenzhen', nameCN: '深圳', lat: 22.5431, lon: 114.0579, timezone: 'Asia/Shanghai', utcOffset: 8 },
            { name: 'Hong Kong', nameCN: '香港', lat: 22.3193, lon: 114.1694, timezone: 'Asia/Hong_Kong', utcOffset: 8 }
        ],
        'Singapore': [
            { name: 'Singapore', nameCN: '新加坡', lat: 1.3521, lon: 103.8198, timezone: 'Asia/Singapore', utcOffset: 8 }
        ],
        'Malaysia': [
            { name: 'Kuala Lumpur', nameCN: '吉隆坡', lat: 3.1390, lon: 101.6869, timezone: 'Asia/Kuala_Lumpur', utcOffset: 8 }
        ],
        'Philippines': [
            { name: 'Manila', nameCN: '马尼拉', lat: 14.5995, lon: 120.9842, timezone: 'Asia/Manila', utcOffset: 8 }
        ],
        'Taiwan': [
            { name: 'Taipei', nameCN: '台北', lat: 25.0330, lon: 121.5654, timezone: 'Asia/Taipei', utcOffset: 8 }
        ]
    },
    'UTC+9': {
        'Japan': [
            { name: 'Tokyo', nameCN: '东京', lat: 35.6762, lon: 139.6503, timezone: 'Asia/Tokyo', utcOffset: 9 },
            { name: 'Osaka', nameCN: '大阪', lat: 34.6937, lon: 135.5023, timezone: 'Asia/Tokyo', utcOffset: 9 },
            { name: 'Kyoto', nameCN: '京都', lat: 35.0116, lon: 135.7681, timezone: 'Asia/Tokyo', utcOffset: 9 }
        ],
        'South Korea': [
            { name: 'Seoul', nameCN: '首尔', lat: 37.5665, lon: 126.9780, timezone: 'Asia/Seoul', utcOffset: 9 },
            { name: 'Busan', nameCN: '釜山', lat: 35.1796, lon: 129.0756, timezone: 'Asia/Seoul', utcOffset: 9 }
        ]
    },
    'UTC+10': {
        'Australia': [
            { name: 'Sydney', nameCN: '悉尼', lat: -33.8688, lon: 151.2093, timezone: 'Australia/Sydney', utcOffset: 10 },
            { name: 'Melbourne', nameCN: '墨尔本', lat: -37.8136, lon: 144.9631, timezone: 'Australia/Melbourne', utcOffset: 10 },
            { name: 'Brisbane', nameCN: '布里斯班', lat: -27.4698, lon: 153.0251, timezone: 'Australia/Brisbane', utcOffset: 10 }
        ],
        'Papua New Guinea': [
            { name: 'Port Moresby', nameCN: '莫尔兹比港', lat: -9.4438, lon: 147.1803, timezone: 'Pacific/Port_Moresby', utcOffset: 10 }
        ]
    },
    'UTC+11': {
        'Solomon Islands': [
            { name: 'Honiara', nameCN: '霍尼亚拉', lat: -9.4456, lon: 159.9729, timezone: 'Pacific/Guadalcanal', utcOffset: 11 }
        ]
    },
    'UTC+12': {
        'New Zealand': [
            { name: 'Auckland', nameCN: '奥克兰', lat: -36.8485, lon: 174.7633, timezone: 'Pacific/Auckland', utcOffset: 12 },
            { name: 'Wellington', nameCN: '惠灵顿', lat: -41.2865, lon: 174.7762, timezone: 'Pacific/Auckland', utcOffset: 12 }
        ],
        'Fiji': [
            { name: 'Suva', nameCN: '苏瓦', lat: -18.1416, lon: 178.4419, timezone: 'Pacific/Fiji', utcOffset: 12 }
        ]
    },
    'UTC+13': {
        'Tonga': [
            { name: 'Nukualofa', nameCN: '努库阿洛法', lat: -21.1393, lon: -175.2048, timezone: 'Pacific/Tongatapu', utcOffset: 13 }
        ]
    },
    'UTC+14': {
        'Kiribati': [
            { name: 'Kiritimati', nameCN: '圣诞岛', lat: 1.8721, lon: -157.4278, timezone: 'Pacific/Kiritimati', utcOffset: 14 }
        ]
    }
};

// 获取所有时区的列表（按UTC偏移排序）
function getTimezones() {
    return Object.keys(globalCitiesData).sort((a, b) => {
        const getOffset = (tz) => {
            if (tz === 'UTC+0') return 0;
            const match = tz.match(/UTC([+-])(\d+(?::\d+)?)/);
            if (!match) return 0;
            const sign = match[1] === '+' ? 1 : -1;
            const [hours, minutes = 0] = match[2].split(':').map(Number);
            return sign * (hours + minutes / 60);
        };
        return getOffset(a) - getOffset(b);
    });
}

// 获取指定时区的国家列表
function getCountriesInTimezone(timezone) {
    if (!globalCitiesData[timezone]) return [];
    return Object.keys(globalCitiesData[timezone]).sort();
}

// 获取指定时区和国家的城市列表
function getCitiesInTimezoneCountry(timezone, country) {
    if (!globalCitiesData[timezone] || !globalCitiesData[timezone][country]) return [];
    return globalCitiesData[timezone][country].sort((a, b) => a.name.localeCompare(b.name));
}

// 兼容旧的接口
function getContinents() {
    return getTimezones();
}

function getCountries(timezone) {
    return getCountriesInTimezone(timezone);
}

function getCities(timezone, country) {
    return getCitiesInTimezoneCountry(timezone, country);
}

// 搜索城市（按UTC偏移排序结果）
function searchCities(query) {
    const results = [];
    const lowerQuery = query.toLowerCase();

    for (const timezone in globalCitiesData) {
        for (const country in globalCitiesData[timezone]) {
            const cities = globalCitiesData[timezone][country];
            cities.forEach(city => {
                if (
                    city.name.toLowerCase().includes(lowerQuery) ||
                    city.nameCN.includes(query)
                ) {
                    results.push({
                        ...city,
                        timezone: timezone,
                        country
                    });
                }
            });
        }
    }

    // 按UTC偏移排序
    return results.sort((a, b) => a.utcOffset - b.utcOffset);
}
