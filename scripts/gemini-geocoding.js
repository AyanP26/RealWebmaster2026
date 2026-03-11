const fs = require('fs');
const { GoogleGenerativeAI } = require('@google/generative-ai');

// Read .env.local manually
const envFile = fs.readFileSync('.env.local', 'utf8');
const apiKeyMatch = envFile.match(/GEMINI_API_KEY=(.+)/);
const apiKey = apiKeyMatch ? apiKeyMatch[1].trim() : '';

const genAI = new GoogleGenerativeAI(apiKey);

const dataPath = './app/Northern Virginia Community Resources.json';
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

const chunk = data;

async function correctAddresses(items) {
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `
    You are an expert geocoding and data validation assistant for Northern Virginia.
    I am giving you a JSON array of community resources. Many of their 'address', 'city', 'zip_code', 'latitude', and 'longitude' fields are hallucinated or slightly wrong.
    
    For each resource in the array:
    1. Search your knowledge base (as if you were performing a Google Search) for the REAL physical address of this exact organization/location.
    2. Correct the 'address', 'city', and 'zip_code' fields to match reality.
    3. Update the 'latitude' and 'longitude' fields to be the exact real-world geographic coordinates of that building.
    
    Output ONLY a valid JSON array containing the corrected objects in the exact same format. Do not add markdown blocks like \`\`\`json.
    
    Input data:
    ${JSON.stringify(items, null, 2)}
    `;

    try {
        const result = await model.generateContent(prompt);
        let raw = result.response.text();
        if (raw.startsWith('```json')) raw = raw.replace(/```json/g, '').replace(/```/g, '').trim();
        return JSON.parse(raw);
    } catch (e) {
        console.error("Failed to parse Gemini response:", e);
        return null;
    }
}

async function run() {
    console.log(`Sending ${chunk.length} items to Gemini 1.5 Pro for verified address and coordinate correction...`);
    const correctedChunk = await correctAddresses(chunk);

    if (correctedChunk) {
        // Merge back into original data
        for (let i = 0; i < correctedChunk.length; i++) {
            data[i] = correctedChunk[i];
            console.log(`Fixed: ${data[i].name} -> ${data[i].address}, ${data[i].city} (${data[i].latitude}, ${data[i].longitude})`);
        }

        // fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf8');
        console.log("Success! Displaying first 3 fixes:");
        console.log(JSON.stringify(data.slice(0, 3), null, 2));
    }
}

run();
