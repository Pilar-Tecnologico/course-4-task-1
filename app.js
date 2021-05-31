//Change the version of this program in package.json to 1.1.0
//For all the excersices Postman is recommended.
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const playersData = require('./data.json');//should require the data.json file
app.use(express.json());    

app.get('/players', (req, res) => {
    //should respond with the "players" array inside playersData and Status 200   
    res.status(200).json(playersData.players);

});


app.get('/players/:role', (req, res) => {
    //should respond with only the players that have with the especified role. Status 200.
    //If there's no player with the specified role it should respond with {"error": "No player found"} and Status 404.
    const role = req.params.role;
    roles = playersData.players.filter(player => player.role === role)
    roles.length > 0 ? res.status(200).json(roles) : res.status(404).json({error: 'No player found'})
   
});

app.put('/players', (req, res) => {
    //Should recive player data from request body.
    //Should console.log the response.
    //Response should be {"operation": "add player", "status": "accepted"} with status 200 if the body request is valid.
    //Response should be {"operation": "add player", "status": "refused", "details": "Invalid body"} with status 409 if any property is missing.
    //The Only valid properties are the ones at every player object in data.json.
    const bodyData = req.body
    console.log(bodyData)

    if (bodyData.name && bodyData.lastname && bodyData.role && bodyData.team){
        res.status(200).json({operation: 'add player', status: 'accepted'})
    }else{
        res.status(409).json({operation: 'add player', status: 'refused', details: 'invalid body'})
    }

});

app.listen(port, () => {
    console.log('Express server started at port ' + port)
});