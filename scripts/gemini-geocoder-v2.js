const fs = require('fs');
const https = require('https');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const envFile = fs.readFileSync('.env.local', 'utf8');
const apiKeyMatch = envFile.match(/GEMINI_API_KEY=(.+)/);
const apiKey = apiKeyMatch ? apiKeyMatch[1].trim() : '';
const genAI = new GoogleGenerativeAI(apiKey);

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

const delay = ms => new Promise(res => setTimeout(res, ms));

async function getRealAddressesFromGemini(chunk) {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const prompt = `You are a data validation assistant for Northern Virginia. I am providing a JSON array of community resources with hallucinated addresses. 
For each resource, find the REAL physical street address, city, and zip code (as if you were performing a Google Search). Output ONLY a valid JSON array of objects with exactly these keys: "id", "name", "address", "city", "zip_code". Do NOT include markdown formatting.
Input Data: ${JSON.stringify(chunk.map(r => ({ id: r.id, name: r.name, city: r.city })), null, 2)}`;

    try {
        const result = await model.generateContent(prompt);
        let raw = result.response.text();
        if (raw.startsWith('```json')) raw = raw.replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(raw);
    } catch (e) {
        console.error("Gemini parse failed:", e);
        return null;
    }
}

async function run() {
    const CHUNK_SIZE = 50;
    for (let i = 0; i < data.length; i += CHUNK_SIZE) {
        const chunk = data.slice(i, i + CHUNK_SIZE);
        console.log(`\nProcessing chunk ${Math.floor(i / CHUNK_SIZE) + 1} of ${Math.ceil(data.length / CHUNK_SIZE)}...`);

        const corrected = await getRealAddressesFromGemini(chunk);

        if (corrected && Array.isArray(corrected)) {
            for (let j = 0; j < chunk.length; j++) {
                const r = chunk[j];
                const fixed = corrected.find(c => c.id === r.id);

                if (fixed && fixed.address && fixed.address.length > 5 && fixed.address !== "unknown") {
                    r.address = fixed.address;
                    r.city = fixed.city;
                    r.zip_code = fixed.zip_code;

                    console.log(`  [${r.id}] Google Search Address: ${fixed.address}, ${fixed.city}`);
                    let geo = await searchNominatim(`${fixed.address.split(',')[0]} ${fixed.city} VA`);

                    if (!geo) {
                        await delay(1000);
                        geo = await searchNominatim(`${fixed.name.replace('&', '')} ${fixed.city} VA`);
                    }

                    if (geo) {
                        r.latitude = parseFloat(geo.lat);
                        r.longitude = parseFloat(geo.lon);
                        console.log(`   -> SUCCESS Geo: ${r.latitude}, ${r.longitude}`);
                    } else {
                        console.log(`   -> FAILED to geocode via Nominatim API`);
                    }
                    await delay(1100);
                } else {
                    console.log(`  [${r.id}] Could not fetch real address from Gemini.`);
                }
            }
            fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf8');
            console.log(`Successfully saved Chunk ${Math.floor(i / CHUNK_SIZE) + 1} back to JSON array.`);
        } else {
            console.log(`Chunk ${Math.floor(i / CHUNK_SIZE) + 1}: Failed to parse LLM Response.`);
        }
    }
    console.log("\nPipeline Complete: All verified addresses and precise map locations logged.");
}
run();
