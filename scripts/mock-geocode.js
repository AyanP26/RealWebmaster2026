const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '../app/Northern Virginia Community Resources.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// Base coordinates for NoVA cities/areas
const cityCoords = {
    "fairfax": [38.8462, -77.3064],
    "arlington": [38.8816, -77.0910],
    "alexandria": [38.8048, -77.0469],
    "reston": [38.9686, -77.3411],
    "chantilly": [38.8943, -77.4311],
    "woodbridge": [38.6582, -77.2497],
    "leesburg": [39.1157, -77.5645],
    "ashburn": [39.0438, -77.4874],
    "herndon": [38.9696, -77.3861],
    "manassas": [38.7509, -77.4753],
    "vienna": [38.9012, -77.2653],
    "falls church": [38.8823, -77.1711],
    "centreville": [38.8404, -77.4292],
    "annandale": [38.8304, -77.1964],
    "sterling": [39.0062, -77.4286],
    "burke": [38.7990, -77.2716],
    "lorton": [38.7046, -77.2272],
    "springfield": [38.7893, -77.1872],
    "mclean": [38.9339, -77.1773],
    "oakton": [38.8832, -77.2955],
    "default": [38.8462, -77.3064] // Default to Fairfax if unknown
};

// Deterministic pseudo-random based on string to keep pins stable
function hashString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) - hash) + str.charCodeAt(i);
        hash |= 0;
    }
    return Math.abs(hash);
}

// Add tiny deterministic jitter (approx ~300 meters) so pins don't overlap,
// but they remain highly accurate to the city center.
function addJitter(val, addressStr) {
    const hash = hashString(addressStr || "unknown");
    const deterministicRandom = (hash % 1000) / 1000; // 0.0 to 1.0
    const jitter = (deterministicRandom - 0.5) * 0.006;
    return val + jitter;
}

let modifiedCount = 0;

const updatedData = data.map(resource => {
    // Force overwrite of coordinates

    let cityStr = resource.city ? resource.city.toLowerCase().trim() : "default";
    let baseCoords = cityCoords[cityStr];

    // If exact city not found, try to find a substring match
    if (!baseCoords) {
        for (const [key, coords] of Object.entries(cityCoords)) {
            if (cityStr.includes(key)) {
                baseCoords = coords;
                break;
            }
        }
    }

    // Fallback
    if (!baseCoords) {
        baseCoords = cityCoords["default"];
    }

    modifiedCount++;
    return {
        ...resource,
        latitude: addJitter(baseCoords[0], resource.name + resource.address),
        longitude: addJitter(baseCoords[1], resource.name + resource.address)
    };
});

fs.writeFileSync(dataPath, JSON.stringify(updatedData, null, 2), 'utf8');
console.log(`Successfully added coordinates to ${modifiedCount} resources.`);
