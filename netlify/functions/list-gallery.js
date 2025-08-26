import fs from "fs";
import path from "path";

export async function handler(event, context) {
  try {
    const galleryDir = path.join(process.cwd(), "content/gallery");

    // Read all files in gallery folder
    const files = fs.readdirSync(galleryDir);

    let items = [];

    for (const file of files) {
      if (file.endsWith(".json")) {
        const filePath = path.join(galleryDir, file);
        const content = fs.readFileSync(filePath, "utf8");
        const data = JSON.parse(content);
        items.push(data);
      }
      // if your CMS creates .md files instead, I’ll adjust this part
    }

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