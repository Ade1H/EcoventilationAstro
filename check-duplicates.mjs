import data from "./src/data/swedish-cities-with-region.json" with { type: "json" };

const slugs = data.map(c => c.slug);
const duplicates = slugs.filter((item, index) => slugs.indexOf(item) !== index);

console.log("Totalt:", data.length);
console.log("Dubbletter:", [...new Set(duplicates)]);