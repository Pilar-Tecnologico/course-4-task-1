
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

const { players } = require('./src/data/data.json');

const { evaluateObj } = require('./src/utils/evaluateObject');

//parse the body
app.use(express.json());


// item one of the task
app.get('/api/players', (req, res) =>{
    res.status(200).json({
        ok: true, 
        players
    })    
});


//item two of the task

app.get('/api/players/:role', (req, res) =>{

    const { role } = req.params; 

    let temPlayers = players; 

    temPlayers = temPlayers.filter(player => player.role === role);

    if(temPlayers.length === 0){    
        res.status(404).json(
            {
                ok: false, 
                error: "No player found", 
            }
        );
    }

    res.status(200).json(
        {
            ok: true, 
            temPlayers, 
        }
    );
    
})


app.put('/api/players', (req, res) =>{

    const player = req.body
    console.log(player);
    if (evaluateObj(player)) {
            res.status(200).json({
                ok: true,
                operation: "add player", 
                status: "accepted"
            })
        }else{
            res.status(409).json({
                ok: false,
                operation: "add player", 
                status: "refused", 
                details: "Invalid body" 
            })
        }
  
})

app.get('/', (req, res) =>{
    res.json({
        ok: true, 
        msg: 'msg'
    })
})

app.listen(port);