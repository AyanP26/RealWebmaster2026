const fs = require('fs');
const https = require('https');

const dataPath = './app/Northern Virginia Community Resources.json';
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

async function searchNominatim(query) {
    return new Promise((resolve) => {
        const req = https.get(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`, {
            headers: { 'User-Agent': 'WeaveNova-App/1.0' }
        }, (res) => {
            let body = '';
            res.on('data', c => body += c);
            res.on('end', () => {
                try {
                    const parsed = JSON.parse(body);
                    if (parsed && parsed.length > 0) resolve(parsed[0]);
                    else resolve(null);
                } catch (e) { resolve(null); }
            });
        });
        req.on('error', () => resolve(null));
    });
}

function delay(ms) {
    return new Promise(res => setTimeout(res, ms));
}

async function run() {
    console.log(`Starting real address geocoding for ${data.length} resources...`);
    let successCount = 0;

    for (let i = 0; i < data.length; i++) {
        const r = data[i];

        // 1. Try Name + City + State
        let result = await searchNominatim(`${r.name} ${r.city} VA`);

        // 2. Try Street Address + City + State
        if (!result && r.address && r.address !== "unknown") {
            await delay(1000); // polite rate limiting (Nominatim requires 1 req/sec limit)
            result = await searchNominatim(`${r.address.split(',')[0]} ${r.city} VA`);
        }

        // 3. Try just Name + VA
        if (!result) {
            await delay(1000);
            result = await searchNominatim(`${r.name} Virginia`);
        }

        if (result) {
            // Update coordinates and address strings to official OSM data!
            r.latitude = parseFloat(result.lat);
            r.longitude = parseFloat(result.lon);
            r.address = result.display_name.split(',')[0].trim(); // Get the primary street name/number
            // We keep original city/zip so the category sidebar doesn't break, but we have True coordinates now.
            successCount++;

            if (i % 20 === 0) console.log(`[${i}/${data.length}] Successfully geocoded ${r.name} to ${r.latitude}, ${r.longitude}`);
        } else {
            console.log(`[${i}/${data.length}] WARNING: Could not geocode ${r.name}`);
        }

        // Nominatim policy: max 1 request per second
        await delay(1100);
    }

    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf8');
    console.log(`Completed. Successfully mapped and corrected adresses for ${successCount}/${data.length} resources.`);
}

run();
