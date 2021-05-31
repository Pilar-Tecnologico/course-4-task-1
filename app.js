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
        res.status(400).json({
            message: "Error",
            err
        });
    }
});

app.get('/players/:role', (req, res) => {
    //should respond with only the players that have with the especified role. Status 200.
    //If there's no player with the specified role it should respond with {"error": "No player found"} and Status 404.
    const requestRole = req.params.role;    
    try {
        let playersByRole = playersData.players.filter(({role}) => role === requestRole );
        if(playersByRole.length > 0){
            res.status(200).json({
                data: playersByRole
            });
        }
        else{
            res.status(404).json({
                message: "Players not found",
                err
            });
        }
        
    } catch (err) {
        res.status(400).json({
        message: "Some error occured",
        err
        });
    }      

});

app.put('/players', (req, res) => {
    //Should recive player data from request body.
    const playerRequestBody = req.body;
    const objKeys = ['name', 'lastname', 'role', 'team'].sort().toString();
    const reqBodyKeys = Object.keys(req.body).sort().toString();
    //Should console.log the response.
    console.log(playerRequestBody);
    //Response should be {"operation": "add player", "status": "accepted"} with status 200 if the body request is valid.
    //Response should be {"operation": "add player", "status": "refused", "details": "Invalid body"} with status 409 if any property is missing.
    const acceptedBody = { "operation": "add player", "status": "accepted" };
    const refusedBody = {
        "operation": "add player",
        "status": "refused",
        "details": "Invalid body"
    };
    //The Only valid properties are the ones at every player object in data.json.            
        if(objKeys === reqBodyKeys){
            res.send(acceptedBody).status(200);
        }
        else{
            res.send(refusedBody).status(409);
        }
});

app.listen(port, () => {
    console.log('Express server started at port ' + port);
});