//Change the version of this program in package.json to 1.1.0
//For all the excersices Postman is recommended.
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const playersData = require('./data.json');//should require the data.json file
app.use(express.json());

app.get('/players', (req, res) => {
    //should respond with the "players" array inside playersData and Status 200    
    //playersData.
    res.status(200).json(playersData);
});

app.get('/players/:role', (req, res) => {
    //should respond with only the players that have with the especified role. Status 200.
    //If there's no player with the specified role it should respond with {"error": "No player found"} and Status 404.
    const arrayResponse = [];
    const varQuery = req.params.role;
    playersData.players.forEach(player => {
        if(player.role == varQuery){
            arrayResponse.push(player);
        }
    });
    
    if(arrayResponse.length!= 0) {
        res.status(200).json(arrayResponse);
    }
    else{
        res.status(404).json({"status":"No player found"});
    }
 });

app.put('/players', (req, res) => {
    //Should recive player data from request body.
    const bodyData = req.body;
    const messageOk = {"operation": "add player", "status": "accepted"};
    const messageNotOk = {"operation": "add player","status": "refused", "details": "Invalid body"};
        //Should console.log the response.
    //Response should be {"operation": "add player", "status": "accepted"} with status 200 if the body request is valid.
    //Response should be {"operation": "add player", "status": "refused", "details": "Invalid body"} with status 409 if any property is missing.
    //The Only valid properties are the ones at every player object in data.json.
    
    if(bodyData.name && bodyData.lastname &&(bodyData.role == 'goalkeeper'||bodyData.role == 'midfielder'||bodyData.role == 'striker')&& (bodyData.team == 'River Plate'||bodyData.team == 'Boca Juniors'||bodyData.team == 'Racing'||bodyData.team ==  'San Lorenzo')){
        //res.status(200).json({"operation": "add player", "status": "accepted"});
        res.status(200).json(messageOk);
        console.log(JSON.stringify(messageOk));
    }
    else{
        //res.status(409).json({"operation": "add player","status": "refused", "details": "Invalid body"}); 
        res.status(409).json(messageNotOk); 
        console.log(JSON.stringify(messageNotOk));
    } 

});

app.listen(port, () => {
    console.log('Express server started at port ' + port);
});