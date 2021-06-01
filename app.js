//Change the version of this program in package.json to 1.1.0 --Check
//For all the excersices Postman is recommended.
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const playersData = require('./data.json');//should require the data.json file --Check
app.use(express.json());

app.get('/players', (req, res) => {
    //should respond with the "players" array inside playersData and Status 200 --Check
    res.status(200).send(playersData.players);
});

app.get('/players/:role', (req, res) => {
    //should respond with only the players that have with the especified role. Status 200. --Check
    //If there's no player with the specified role it should respond with {"error": "No player found"} and Status 404. --Check
    const reqRole = req.params.role;
    const playersRole = playersData.players.filter(player => player.role === reqRole);
    playersRole.length ? res.status(200).send(playersRole) : res.status(404).json({"error": "No player found"});
    
});

app.put('/players', (req, res) => {
    //Should recive player data from request body. --Check
    //Should console.log the response. --Check
    //Response should be {"operation": "add player", "status": "accepted"} with status 200 if the body request is valid. --Check
    //Response should be {"operation": "add player", "status": "refused", "details": "Invalid body"} with status 409 if any property is missing. --Check
    //The Only valid properties are the ones at every player object in data.json. --Check
    const bodyData = req.body;
    const props = ["name", "lastname", "role", "team"];
    const checkProps = props.every(prop => prop in bodyData);
    if (checkProps) {
        const response = {"operation": "add player", "status": "accepted"};
        res.status(200).json(response);
        console.log(response);
    }
    else {
        const response = {"operation": "add player", "status": "refused", "details": "Invalid body"}
        res.status(409).json(response);
        console.log(response);
    };
});

app.listen(port, () => {
    console.log('Express server started at port ' + port)
});