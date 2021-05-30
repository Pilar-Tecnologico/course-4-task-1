//Change the version of this program in package.json to 1.1.0
//For all the excersices Postman is recommended.
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const playersData = require('./data.json');//should require the data.json file
app.use(express.json());

const players = playersData.players;

app.get('/players', (req, res) => {
    //should respond with the "players" array inside playersData and Status 200    
    res.status(200).send(players);    
});

app.get('/players/:role', (req, res) => {
    //should respond with only the players that have with the especified role. Status 200.
    //If there's no player with the specified role it should respond with {"error": "No player found"} and Status 404.
    const reqRole = req.params.role;
    let newList = players.filter(({role}) => role === reqRole );
    newList.length > 0 ? res.status(200).send(newList) : res.status(404).send('Player not found'); 
});

app.put('/players', (req, res) => {
    //Should recive player data from request body.
    const objKeys = ['name', 'lastname', 'role', 'team'].sort().toString();
    const dataBody = req.body;
    const bodyKeys = Object.keys(req.body).sort().toString();

    //Should console.log the response.
    console.log(dataBody);

    // console.log(objKeys);
    // console.log(bodyKeys);   

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

// {
//     "name": "nombre",
//     "lastname": "apellido",
//     "role": "posicion",
//     "team": "equipo"
// }