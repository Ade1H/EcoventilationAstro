import fs from "fs";

const filePath = "./src/data/swedish-cities-with-region.json";

const raw = fs.readFileSync(filePath, "utf-8");
const data = JSON.parse(raw);

const allCommunes = data.map(c => c.name);

// === LÄGG IN OFFICIELL LISTA MED 290 KOMMUNER HÄR ===
// (Jag använder din lista som bas – vi hittar vilka som saknas)

const official = [...new Set(allCommunes)]; // temporär

const missing = official.filter(c => !allCommunes.includes(c));

console.log("Saknade kommuner:");
console.log(missing);
console.log("Antal saknade:", missing.length);