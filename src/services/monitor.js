import fs from "fs/promises";
import { findOldAndNewFile } from "../utils/helper.js";

async function monitor() {
  const files = await findOldAndNewFile();

  const oldFile = files.oldFile;
  const newFile = files.newFile;

  const dataOld = await fs.readFile(oldFile.path);
  const dataNew = await fs.readFile(newFile.path);

  const oldFileData = JSON.parse(dataOld);
  const newFileData = JSON.parse(dataNew);

  function findChanges(oldFile, newFile) {
    let changes = [];

    // 1. Create a lookup map of the old array for O(1) access
    const oldMap = new Map(oldFile.map((item) => [item.name, item]));
    console.log("Old map is: ", oldMap);

    // 2. Loop through the new array to find updates and additions
    newFile.forEach((newItem) => {
      const oldItem = oldMap.get(newFile.name);
      // console.log("old item is: ", oldItem)

      if (!oldItem) {
        changes.push({
          type: "added",
          name: newItem.name,
          price: newItem.price,
          availability: newItem.availability,
          review: newItem.reviews,
        });
      } else {
        let itemChanges = {};

        if (oldItem.name !== newItem.name)
          itemChanges.name = { from: oldItem.name, to: newItem.name };
        if (oldItem.price !== newItem.price)
          itemChanges.price = { from: oldItem.price, to: newItem.price };
        if (oldItem.availability !== newItem.availability)
          itemChanges.availability = {
            from: oldItem.availability,
            to: newItem.availability,
          };
        if (oldItem.review !== newItem.review)
          itemChanges.review = { from: oldItem.review, to: newItem.review };

        // If the itemChanges object has keys, something changed
        if (Object.keys(itemChanges).length > 0) {
          changes.push({
            id: newItem.id,
            type: "updated",
            changes: itemChanges,
          });
        }
      }
    });


    // 3. Optional: Check for deleted items
    const newIds = new Set(newFile.map((item) => item.name));
    oldFile.forEach((oldItem) => {
      if (!newIds.has(oldItem.name)) {
        changes.push({ id: oldItem.name, type: "deleted", data: oldItem });
      }
    });

    console.log("changes are: ", changes)

    return changes;
  }

  findChanges(oldFileData, newFileData);
}

monitor();
