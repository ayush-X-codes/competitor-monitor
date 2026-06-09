import fs from "fs";
import { fileURLToPath } from "url";
import path, { join } from "path";

const __filename = fileURLToPath(import.meta.url);
console.log("file path is: ", __filename);
const __dirname = path.dirname(__filename);
console.log("directory path is: ", __dirname);

const filePath = path.join(__dirname, "..", "/data/");
console.log("file full path is: ", filePath);

async function findOldAndNewFile(dirPath) {

  const files = await fs.readdir(dirPath);

  if (files.length === 0){
    console.log("The directory is completely empty.");
    return;
  };

  const fileStats = await Promise.all(
    files.map(async (file) => {
        const filePath = join(dirPath, file);
        const fileStat = await fs.stat(filePath);

        return {
            name: file,
            path: filePath,
            isFile: fileStat.isFile(),
            mtime: fileStat.mtimeMs
        }
    })
  )




console.log("files in data directory: ", file)



}

findOldAndNewFile(filePath);
