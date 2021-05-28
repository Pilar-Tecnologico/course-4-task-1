//Change the version of this program in package.json to 1.1.0
//For all the excersices Postman is recommended.
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const playersData = require('./data.json'); //should require the data.json file
app.use(express.json());

app.get('/players', (req, res) => {
  //should respond with the "players" array inside playersData and Status 200
  res.send(playersData.players).status(200);
});

app.get('/players/:role', (req, res) => {
  //should respond with only the players that have with the especified role. Status 200.
  //If there's no player with the specified role it should respond with {"error": "No player found"} and Status 404.
  const playersByRole = playersData.players.filter((player) => {
    return player.role === req.params.role;
  });

  playersByRole.length > 0
    ? res.send(playersByRole).status(200)
    : res.send({ error: 'No Player found' }).status(404);
});

app.put('/players', (req, res) => {
  //Should recive player data from request body.
  //Should console.log the response.
  //Response should be {"operation": "add player", "status": "accepted"} with status 200 if the body request is valid.
  //Response should be {"operation": "add player", "status": "refused", "details": "Invalid body"} with status 409 if any property is missing.
  //The Only valid properties are the ones at every player object in data.json.

  const reqData = req.body;
  const validProperties = Object.keys(playersData.players[0]);
  const reqDataProperties = Object.keys(reqData);
  const acceptedBody = { operation: 'add player', status: 'accepted' };
  const refusedBody = {
    operation: 'add player',
    status: 'refused',
    details: 'Invalid body',
  };
  if (validProperties.length === reqDataProperties.length) {
    for (let index = 0; index < validProperties.length; index++) {
      if (validProperties[index] !== reqDataProperties[index]) {
        res.send(refusedBody).status(409);
        console.log('RES =>', refusedBody, 'status: 409');
        return;
      }
    }

    res.send(acceptedBody).status(200);
    console.log('RES =>', acceptedBody, 'status: 200');
  } else {
    res.send(refusedBody).status(409);
    console.log('RES =>', refusedBody, 'status: 409');
  }
});

app.listen(port, () => {
  console.log('Express server started at port ' + port);
});
