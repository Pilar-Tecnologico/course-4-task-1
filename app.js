const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const playersData = require('./data.json');//takes the data.json file data for require
app.use(express.json());

const players = playersData.players;

app.get('/players', (req, res) => {
    //respond with the "players" array from playersData and Status 200    
    res.status(200).send(players);    
});

app.get('/players/:role', (req, res) => {
    //responds with only the players that have especified role. Status 200.
    //In no player with the specified role case, it responds "No player found" error and Status 404.
    const rRole = req.params.role;
    let list = players.filter(({role}) => role === rRole );
    list.length > 0 ? res.status(200).send(list) : res.status(404).send('Player not found'); 
});

app.put('/players', (req, res) => {
    //recive player data from request body.
    const objKeys = ['name', 'lastname', 'role', 'team'].sort().toString();
    const dataBody = req.body;
    const bodyKeys = Object.keys(req.body).sort().toString();

    //Should console.log the response.
    console.log(dataBody);

    //Response should be {"operation": "add player", "status": "accepted"} with status 200 if the body request is valid.
    //Response should be {"operation": "add player", "status": "refused", "details": "Invalid body"} with status 409 if any property is missing.
    //The Only valid properties are the ones at every player object in data.json.
    if (objKeys === bodyKeys) {
        res.status(200).send({"operation": "add player", "status": "accepted"}); 
    } else {
        res.status(409).send({"operation": "add player", "status": "refused", "details": "Invalid body"});
    }
});

app.listen(port, () => {
    console.log('Express server started at port ' + port);
});