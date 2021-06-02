//Change the version of this program in package.json to 1.1.0
//For all the excersices Postman is recommended.
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const playersData = require('./data.json');//should require the data.json file
app.use(express.json());

app.get('/players', (req, res) => {
    //should respond with the "players" array inside playersData and Status 200   
    try {
        res.status(200).json({
          data: playersData.players
        });
      } catch (err) {
        res.status(404).json({
          message: "Error",
          err
        });
      }    
});  

app.get('/players/:role', (req, res) => {
    //should respond with only the players that have with the especified role. Status 200.
    //If there's no player with the specified role it should respond with {"error": "No player found"} and Status 404.
    
    const reqRole = req.params.role;   
    let playersByRole = playersData.players.filter((player) => player.role === reqRole);       
    if(playersByRole.length > 0){
      res.status(200).send(playersByRole);      
     }else{
      res.status(404).send("Player Not Found");
      
      }      
});

app.put('/players', (req, res) => {
    //Should recive player data from request body.
    //Should console.log the response.
    //Response should be {"operation": "add player", "status": "accepted"} with status 200 if the body request is valid.
    //Response should be {"operation": "add player", "status": "refused", "details": "Invalid body"} with status 409 if any property is missing.
    //The Only valid properties are the ones at every player object in data.json.
    const reqBody = req.params.body;
    let playersDataAdd = (playersData.name && playersData.lastname && playersData.role && playersData.team)    
    if (playersDataAdd === reqBody){
      res.status(200).json({"operation": "add player", "status": "accepted"});
      console.log('"operation": "add player", "status": "accepted"');
    }else{
      res.status(409).json({"operation": "add player", "status": "refused", "details": "Invalid body"});
      console.log('"operation": "add player", "status": "refused", "details": "Invalid body"');
    }  
});

app.listen(port, () => {
    console.log('Express server started at port ' + port)
});