const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const playersData = require('./data.json');
app.use(express.json());

app.get('/players', (req, res) => {
    res.status(200).send(playersData.players);
});

app.get('/players/:role', (req, res) => {
    const reqRole = req.params.role;
    const playersRole = playersData.players.filter(player => player.role === reqRole);
    playersRole.length ? res.status(200).send(playersRole) : res.status(404).json({"error": "No player found"});

});

app.put('/players', (req, res) => {

    const bodyData = req.body;
    const dataProps = Object.keys(bodyData).sort();
    const props = ["name", "lastname", "role", "team"].sort();
    const checkProps = dataProps.every((dataProp, index) => dataProp === props[index]);
    const response = checkProps ? {"operation": "add player", "status": "accepted"} : {"operation": "add player", "status": "refused", "details": "Invalid body"};

    checkProps ? res.status(200).json(response) : res.status(409).json(response);
    console.log(response);
});

app.listen(port, () => {
    console.log('Express server started at port ' + port)
});