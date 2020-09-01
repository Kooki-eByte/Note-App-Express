const fs = require("fs");

module.exports = function (app) {
  //** This will grab the /api/notes GET request from index.js. This function reads the JSON file and sends it back to the index.js*/
  app.get("/api/notes", function (req, res) {
    fs.readFile("./db/db.json", (err, data) => {
      if (err) throw err;
      let db = JSON.parse(data);
      res.json(db);
    });
  });

  //** Called from the index.js file with a object made from the users response of the notes. It will read the JSON array, push the note into the array, and reformat the whole json with the new array of objects inside of it, afterward it will send back a res.json with the new database */
  app.post("/api/notes", function (req, res) {
    let note = req.body;

    fs.readFile("./db/db.json", (err, data) => {
      if (err) throw err;
      let db = JSON.parse(data);
      db.push(note);

      fs.writeFile("./db/db.json", JSON.stringify(db), (err) => {
        if (err) throw err;

        console.log("Database updated");
      });
      res.json(db);
    });
  });

  //** Called from the index.js file this will delete the given object that the user clicked the delete button from. */
  app.delete("/api/notes/:id", function (req, res) {
    let Listid = req.params;

    fs.readFile("./db/db.json", (err, data) => {
      if (err) throw err;
      let db = JSON.parse(data);
      for (let i = 0; i < db.length; i++) {
        db[i].id === Listid.id ? db.splice(i, 1) : console.log("");
      }

      fs.writeFile("./db/db.json", JSON.stringify(db), (err) => {
        if (err) throw err;

        console.log("Item deleted ... Database updated");
        res.json(db);
      });
    });
  });
};
