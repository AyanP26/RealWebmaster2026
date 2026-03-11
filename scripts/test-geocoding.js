const fs = require('fs');
const https = require('https');

const dataPath = './app/Northern Virginia Community Resources.json';
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8')).slice(0, 5); // Test with 5

async function searchNominatim(name, city) {
    const query = encodeURIComponent(`${name} ${city} VA`);
    return new Promise((resolve) => {
        const req = https.get(`https://nominatim.openstreetmap.org/search?q=${query}&format=json&limit=1`, {
            headers: {
                'User-Agent': 'WeaveNova-App/1.0 (contact@weavenova.org)'
            }
        }, (res) => {
            let body = '';
            res.on('data', c => body += c);
            res.on('end', () => {
                try {
                    const parsed = JSON.parse(body);
                    if (parsed && parsed.length > 0) {
                        resolve(parsed[0]);
                    } else {
                        resolve(null);
                    }
                } catch (e) { resolve(null); }
            });
        });
        req.on('error', () => resolve(null));
    });
}

async function run() {
    for (const r of data) {
        console.log(`Searching for: ${r.name}`);
        const result = await searchNominatim(r.name, r.city);
        if (result) {
            console.log(`  Found: ${result.display_name}`);
            console.log(`  Lat: ${result.lat}, Lon: ${result.lon}`);
        } else {
            console.log(`  Not found via Nominatim.`);
        }
    }
}
run();
