import fs from "fs";

const raw = fs.readFileSync(
  "./src/data/swedish-cities-with-region.json",
  "utf8"
);

const data = JSON.parse(raw);

console.log("✅ JSON OK");
console.log("Antal kommuner:", data.length);