const fs = require("fs");

// Read local json file system.
const readLocalJsonFile = (fileName, path, Unicode) => {
  try {
    const data = fs.readFileSync(`${path}/${fileName}`, Unicode);
    return data;
  } catch (err) {
    console.error(err);
  }
};

// Method Example.
// readLocalJsonFile("Hello.json", "./", "utf-8");

// Write json file into to local file system.
const writeLocalJsonFile = (path, name, jsonObj) => {
  // convert JSON object to string
  const objStr = JSON.stringify(jsonObj);

  // write JSON string to a file
  const fileName = `${name}_${new Date()
    .toISOString()
    .slice(0, 10)}_${Math.floor(Math.random() * 10000)}.json`;
  fs.writeFile(`./backupdata/${fileName}`, objStr, (err) => {
    if (err) {
      throw err;
    }
    console.log("JSON data is saved.");
  });
  // return fileName then save to firebase log.
  return fileName;
};

// Method Example.
// writeLocalJsonFile("save as file name", accountObj);

module.exports = { readLocalJsonFile, writeLocalJsonFile };
