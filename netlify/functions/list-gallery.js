import fs from "fs";
import path from "path";

export async function handler(event, context) {
  try {
    const galleryDir = path.join(process.cwd(), "content/gallery");

    // Read all .json files in gallery folder
    const files = fs.readdirSync(galleryDir).filter(f => f.endsWith(".json"));

    const items = files.map(file => {
      const content = fs.readFileSync(path.join(galleryDir, file), "utf8");
      return JSON.parse(content);
    });

    return {
      statusCode: 200,
      body: JSON.stringify(items),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
}