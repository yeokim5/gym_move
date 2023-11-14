import fs from "fs";
import { imageURL } from "./url.js";

const filePath = "exercise.json"; // Path to your JSON file

// Read the JSON file
fs.readFile(filePath, "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  // Parse the JSON data
  const exercises = JSON.parse(data);
  let index = 0;
  // Iterate through the exercises and update the "link" property
  for (const category in exercises) {
    for (const exercise of exercises[category]) {
      // Replace the "link" property with an array of links
      exercise.link = imageURL[index];
      index += 1;
    }
  }

  // Convert the updated data back to JSON
  const updatedData = JSON.stringify(exercises, null, 2);

  // Write the updated JSON back to the file
  fs.writeFile(filePath, updatedData, (writeErr) => {
    if (writeErr) {
      console.error(writeErr);
      return;
    }
    console.log("Links updated successfully.");
  });
});
