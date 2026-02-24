import fs from "fs";
import data from "./src/data/swedish-cities-with-region.json" with { type: "json" };

const seen = new Set();
const cleaned = [];

for (const city of data) {
  if (!seen.has(city.slug)) {
    seen.add(city.slug);
    cleaned.push(city);
  } else {
    console.log("Tar bort dublett:", city.slug);
  }
}

fs.writeFileSync(
  "./src/data/swedish-cities-with-region.json",
  JSON.stringify(cleaned, null, 2)
);

console.log("✅ Rensat. Ny längd:", cleaned.length);