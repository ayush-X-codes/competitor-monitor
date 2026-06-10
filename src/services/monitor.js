import fs from "fs";
import { findOldAndNewFile } from "../utils/helper";

async function monitor() {
  const files = await findOldAndNewFile();
  const oldFile = files.oldFile;
  const newFile = files.newFile;

  const dataOld = await fs.readFilef(oldFile);
  const dataNew = await fs.readFilef(newFile);
  const oldFileData = JSON.parse(dataOld);
  const newFileData = JSON.parse(dataNew);


  
}
