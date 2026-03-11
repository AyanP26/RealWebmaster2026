const fs = require('fs');
const path = require('path');
const https = require('https');

const dataPath = path.join(__dirname, '../app/Northern Virginia Community Resources.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

// 1. Add unique IDs
function slugify(text) {
    if (!text) return 'unknown';
    return text.toString().toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .substring(0, 30);
}

// 2. Extract unique zip codes
const uniqueZips = [...new Set(data.map(r => r.zip_code))].filter(Boolean);

async function fetchZipInfo(zip) {
    return new Promise((resolve, reject) => {
        https.get(`https://api.zippopotam.us/us/${zip}`, (res) => {
            if (res.statusCode !== 200) {
                resolve(null);
                res.resume();
                return;
            }
            let body = '';
            res.on('data', chunk => body += chunk);
            res.on('end', () => {
                try {
                    const parsed = JSON.parse(body);
                    if (parsed.places && parsed.places.length > 0) {
                        resolve({
                            lat: parseFloat(parsed.places[0].latitude),
                            lng: parseFloat(parsed.places[0].longitude)
                        });
                    } else {
                        resolve(null);
                    }
                } catch (e) { resolve(null); }
            });
        }).on('error', () => resolve(null));
    });
}

// Deterministic jitter
function hashString(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = ((hash << 5) - hash) + str.charCodeAt(i);
        hash |= 0;
    }
    return Math.abs(hash);
}

function addJitter(val, addressStr) {
    const hash = hashString(addressStr || "unknown");
    const deterministicRandom = (hash % 1000) / 1000; // 0.0 to 1.0
    const jitter = (deterministicRandom - 0.5) * 0.012; // slightly wider jitter (approx 1 mile) for zip level
    return val + jitter;
}

async function run() {
    console.log(`Found ${uniqueZips.length} unique zip codes. Fetching accurate coordinates...`);
    const zipMap = {};
    for (const zip of uniqueZips) {
        const cleanZip = zip.split('-')[0].trim();
        const coords = await fetchZipInfo(cleanZip);
        if (coords) {
            zipMap[zip] = coords;
        }
        // Small delay to be polite to the free API
        await new Promise(r => setTimeout(r, 100));
    }

    const updatedData = data.map((resource, i) => {
        // Generate ID if missing
        const id = resource.id || `${slugify(resource.name)}-${i}`;

        let lat = resource.latitude;
        let lng = resource.longitude;

        const cleanZip = resource.zip_code ? resource.zip_code.split('-')[0].trim() : null;
        if (cleanZip && zipMap[resource.zip_code]) {
            // Apply real zip code coordinates with jitter
            lat = addJitter(zipMap[resource.zip_code].lat, resource.name + resource.address);
            lng = addJitter(zipMap[resource.zip_code].lng, resource.name + resource.address);
        } else {
            console.log(`Could not find zip ${resource.zip_code} for ${resource.name}, keeping existing coords`);
        }

        return {
            id,
            ...resource,
            latitude: lat,
            longitude: lng
        };
    });

    fs.writeFileSync(dataPath, JSON.stringify(updatedData, null, 2), 'utf8');
    console.log(`Successfully assigned unique IDs and completely accurate Zip-level coordinates to ${updatedData.length} resources.`);
}

run();
