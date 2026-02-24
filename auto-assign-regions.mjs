import fs from "fs";

/*
  🔥 AUTOMATISK REGION MATCHNING
  Detta script försöker matcha kommunens namn
  mot en officiell lista över län.
*/

const inputPath = "./src/data/swedish-cities-with-region.json";

// ================================
// ✅ OFFICIELL KOMMUN → LÄN MAPPING
// (Du kan utöka denna vid behov)
// ================================

const municipalityToRegion = {
  "Stockholm": "Stockholms län",
  "Solna": "Stockholms län",
  "Sundbyberg": "Stockholms län",
  "Täby": "Stockholms län",
  "Göteborg": "Västra Götalands län",
  "Borås": "Västra Götalands län",
  "Kungälv": "Västra Götalands län",
  "Trollhättan": "Västra Götalands län",
  "Malmö": "Skåne län",
  "Lund": "Skåne län",
  "Helsingborg": "Skåne län",
  "Kristianstad": "Skåne län"
};

// ================================

const cities = JSON.parse(fs.readFileSync(inputPath, "utf-8"));

const updated = cities.map(city => {

  const matchedRegion =
    municipalityToRegion[city.name] ||
    municipalityToRegion[city.slug] ||
    city.region;

  return {
    ...city,
    region: matchedRegion || "Okänt län"
  };
});

fs.writeFileSync(inputPath, JSON.stringify(updated, null, 2));

console.log("✅ Automatisk region-uppdatering klar!");