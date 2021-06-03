//Change the version of this program in package.json to 1.1.0
//For all the excersices Postman is recommended.
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const playersData = require("./data.json"); //should require the data.json file
app.use(express.json());
const _ = require("underscore");

app.get("/players", (req, res) => {
  //should respond with the "players" array inside playersData and Status 200
  res.json(playersData.players);
});

app.get("/players/:role", (req, res) => {
  //should respond with only the players that have with the especified role. Status 200.
  //If there's no player with the specified role it should respond with {"error": "No player found"} and Status 404.
  const role = req.params.role;
  playersData.players.filter((players) => {
    if (players.role === role) {
      res.status(200).json(players);
    }
  });
  res.status(404).json({ status: "error: No player found" });
});

app.put("/players/:id", (req, res) => {
  //Should recive player data from request body.
  //Should console.log the response.
  //Response should be {"operation": "add player", "status": "accepted"} with status 200 if the body request is valid.
  //Response should be {"operation": "add player", "status": "refused", "details": "Invalid body"} with status 409 if any property is missing.
  //The Only valid properties are the ones at every player object in data.json.
  const miBody = req.body;
  const miId = req.params.id;
  const { name, lastname, role, team } = req.body;
  if (name && lastname && role && team) {
    playersData.players.forEach((players) => {
      if (players.id === miId) {
        players.name = miBody.name;
        players.lastname = miBody.lastname;
        players.role = miBody.role;
        players.team = miBody.team;
      }
    });
    console.log(res);
    res.json({ operation: "add player", status: "accepted" });
  } else {
    res.status(409).json({
      operation: "add player",
      status: "refused",
      details: "Invalid body",
    });
  }
});

app.listen(port, () => {
  console.log("Express server started at port ");
});
