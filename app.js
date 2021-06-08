//Change the version of this program in package.json to 1.1.0
//For all the excersices Postman is recommended.
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const playersData = require('./data.json');//should require the data.json file*
app.use(express.json());

app.get('/players', (req, res) => {
    //should respond with the "players" array inside playersData and Status 200    
    //should respond with the "players" array inside playersData and Status 200 
    res.status (200).json(playersData.players);   
});


app.get('/players/:role', (req, res) => {
    //should respond with only the players that have with the especified role. Status 200.
    //If there's no player with the specified role it should respond with {"error": "No player found"} and Status 404.
    const role= req.params.role;
    const roleList= playersData.players.filter(el => el.role === role)
    roleList.length>0 ? res.status(200).json(roleList) :res.status(404).json({"error": 'Player not found'} )
 });


app.put('/players', (req, res) => {
    //Response should be {"operation": "add player", "status": "accepted"} with status 200 if the body request is valid.
//     //Response should be {"operation": "add player", "status": "refused", "details": "Invalid body"} with status 409 if any property is missing.
//     //The Only valid properties are the ones at every player object in data.json.
  bodyPlayer = req.body;  
if (!bodyPlayer.name || !bodyPlayer.lastname || !bodyPlayer.role || !bodyPlayer.team){
    res.status(409).json({"operation": "add player", "status": "refused", "details": "Invalid body"});
    console.log('"operation": "add player", "status": "refused", "details": "Invalid body"');
}
else{
    res.status(200).json({"operation": "add player", "status": "accepted"});
  console.log('"operation": "add player", "status": "accepted"');
}
console.log(req.body);

});


 app.listen(port, () => {
    console.log('Express server started at port ' + port)
 }); 