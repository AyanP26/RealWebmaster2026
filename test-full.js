const { parseQuery, rankResources } = require("./app/utils/searchEngine.ts");
const resourcesData = require("./app/Northern Virginia Community Resources.json");

const queries = ["cheap food", "where can i get cheap food", "i want to learn how to code", "fun things to do with kids"];
for (const q of queries) {
    console.log(`\n=== "${q}" ===`);
    const parsed = parseQuery(q);
    const ranked = rankResources(resourcesData, parsed, { strict: true });
    
    if (ranked.length > 0) {
        ranked.slice(0, 3).forEach(r => console.log(`- ${r.name} (${r.category})`));
    } else {
        const fallback = rankResources(resourcesData, parsed, { strict: false });
        if (fallback.length > 0) {
            console.log("-> ENGAGED FULL TEXT FALLBACK");
            fallback.slice(0, 3).forEach(r => console.log(`- ${r.name} (${r.category})`));
        } else {
            console.log("-> ABSOLUTELY NO RESULTS");
        }
    }
}
