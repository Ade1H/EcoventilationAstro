import fs from "fs";

/*
  🔥 REGION MAP
  Här kopplar vi städer till rätt län.
  Vi bygger upp den manuellt en gång – sedan är det automatiskt.
*/

const regionMap = {
  "Stockholms län": [
    "stockholm",
    "taby",
    "sodertalje",
    "nacka",
    "danderyd",
    "jarfalla",
    "solna",
    "sollentuna",
    "tyreso",
    "upplands-vasby",
    "upplands-bro"
  ],

  "Västra Götalands län": [
    "goteborg",
    "boras",
    "trollhattan",
    "uddevalla",
    "kungalv",
    "alingsas"
  ],

  "Skåne län": [
    "malmo",
    "helsingborg",
    "lund",
    "kristianstad",
    "landskrona"
  ]
};

/*
  Läs din nya JSON
*/
const inputPath = "./src/data/swedish-cities-with-region.json";
const cities = JSON.parse(fs.readFileSync(inputPath, "utf-8"));

/*
  Sätt rätt region baserat på slug
*/
const updated = cities.map(city => {

  let foundRegion = "Okänt län";

  for (const [regionName, slugs] of Object.entries(regionMap)) {
    if (slugs.includes(city.slug)) {
      foundRegion = regionName;
      break;
    }
  }

  return {
    ...city,
    region: foundRegion
  };
});

/*
  Spara ny fil
*/
fs.writeFileSync(
  inputPath,
  JSON.stringify(updated, null, 2)
);

console.log("✅ Alla regioner har nu blivit automatiskt tilldelade!");