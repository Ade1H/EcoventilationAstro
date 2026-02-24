import fs from "fs";

// 🔥 ÄNDRA DENNA PATH OM DIN JSON LIGGER ANNORLUNDA
const inputPath = "./src/data/swedish-cities.json";
const outputPath = "./src/data/swedish-cities-with-region.json";

// Läs json
const cities = JSON.parse(fs.readFileSync(inputPath, "utf-8"));

// Här kan du manuellt lägga in riktig region senare
const updated = cities.map(city => ({
  ...city,
  region: city.region || "Okänt län"
}));

// Spara ny fil
fs.writeFileSync(outputPath, JSON.stringify(updated, null, 2));

console.log("✅ Ny JSON med region skapad!");