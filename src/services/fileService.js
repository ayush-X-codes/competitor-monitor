import fs from "fs";

async function saveFile(filePath, books) {
    await fs.writeFile(filePath, JSON.stringify(books, null, 2));
    console.log("file writes succesfully");
}

export {saveFile}