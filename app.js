<<<<<<< HEAD
// Change the version of this program in package.json to 1.1.0. [Done]

// For all the excersices Postman is recommended.
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
// Should require the data.json file. [Done]
const playersData = require("./data.json");
app.use(express.json());

app.get("/players", (req, res) => {
  // Should respond with the "players" array inside playersData and Status 200. [Done]
  res.status(200).json(playersData);
});

app.get("/players/:role", (req, res) => {
  const role = req.params.role;
  const { players } = playersData;
  const playersFiltred = players.filter((player) => player.role === role);

  playersFiltred.length === 0
    ? // If there's no player with the specified role it should respond with {"error": "No player found"} and Status 404. [Done]
      res.status(404).json({ error: "No player found" })
    : // Should respond with only the players that have with the especified role. Status 200.
      res.status(200).json(playersFiltred);
});

app.put("/players", (req, res) => {
  // Should recive player data from request body. [Done]
  const bodyData = req.body;
  const propertiesToValidate = Object.keys(bodyData);
  // The Only valid properties are the ones at every player object in data.json. [Done]
  const { players } = playersData;
  const validProperties = Object.keys(players[0]);

  let flag = 0;

  const invalidAnswer = {
    operation: "add player",
    status: "refused",
    details: "Invalid body",
  };
  const validAnswer = {
    operation: "add player",
    status: "accepted",
  };

  validProperties.forEach((validProperty) => {
    propertiesToValidate.forEach((propertyToValidate) => {
      propertyToValidate === validProperty ? flag++ : null;
    });
  });

  // Should console.log the response. [Done]
  validProperties.length === flag
    ? // Response should be {"operation": "add player", "status": "accepted"} with status 200 if the body request is valid. [Done]
      (console.log(validAnswer), res.status(200).json(validAnswer))
    : // Response should be {"operation": "add player", "status": "refused", "details": "Invalid body"} with status 409 if any property is missing. [Done]
      (console.log(invalidAnswer), res.status(409).json(invalidAnswer));
});

app.listen(port, () => {
  console.log("Express server started at port " + port);
});
=======
// Change the version of this program in package.json to 1.1.0. [Done]

// For all the excersices Postman is recommended.
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
// Should require the data.json file. [Done]
const playersData = require("./data.json");
app.use(express.json());

app.get("/players", (req, res) => {
  // Should respond with the "players" array inside playersData and Status 200. [Done]
  res.status(200).json(playersData);
});

app.get("/players/:role", (req, res) => {
  const role = req.params.role;
  const { players } = playersData;
  const playersFiltred = players.filter((player) => player.role === role);

  playersFiltred.length === 0
    ? // If there's no player with the specified role it should respond with {"error": "No player found"} and Status 404. [Done]
      res.status(404).json({ error: "No player found" })
    : // Should respond with only the players that have with the especified role. Status 200.
      res.status(200).json(playersFiltred);
});

app.put("/players/check", (req, res) => {
  // Should recive player data from request body. [Done]
  const bodyData = req.body;
  const propertiesToValidate = Object.keys(bodyData);
  // The Only valid properties are the ones at every player object in data.json. [Done]
  const { players } = playersData;
  const validProperties = Object.keys(players[0]);

  let flag = 0;

  const invalidAnswer = {
    operation: "add player",
    status: "refused",
    details: "Invalid body",
  };
  const validAnswer = {
    operation: "add player",
    status: "accepted",
  };

  validProperties.forEach((validProperty) => {
    propertiesToValidate.forEach((propertyToValidate) => {
      propertyToValidate === validProperty ? flag++ : null;
    });
  });

  // Should console.log the response. [Done]
  validProperties.length === flag
    ? // Response should be {"operation": "add player", "status": "accepted"} with status 200 if the body request is valid. [Done]
      (console.log(validAnswer), res.status(200).json(validAnswer))
    : // Response should be {"operation": "add player", "status": "refused", "details": "Invalid body"} with status 409 if any property is missing. [Done]
      (console.log(invalidAnswer), res.status(409).json(invalidAnswer));
});

app.listen(port, () => {
  console.log("Express server started at port " + port);
});
>>>>>>> d20666ab615743ba3bb5615ef0e9e9d463e2ec17
