const { parseQuery, rankResources } = require("./app/utils/searchEngine");

const queries = [
    "cheap food", 
    "where can i get cheap food",
    "i want to learn how to code",
    "fun things to do with kids"
];

for (const q of queries) {
    console.log(`\n=== "${q}" ===`);
    console.dir(parseQuery(q), { depth: null });
}
