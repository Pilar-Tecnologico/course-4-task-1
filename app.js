//Change the version of this program in package.json to 1.1.0
//For all the excersices Postman is recommended.
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const playersData = require("./data.json"); //should require the data.json file
app.use(express.json());

app.get("/players", (req, res) => {
	//should respond with the "players" array inside playersData and Status 200
	res.send(playersData.players);
});

app.get("/players/:role", (req, res) => {
	const role = req.params.role;
	const {players} = playersData;
	const rolePlayers = players.filter((player) => player.role === role);

	//If there's no player with the specified role it should respond with {"error": "No player found"} and Status 404.
	if (rolePlayers.length === 0) {
		res.status(404).json({
			error: "No player found",
		});
		return;
	}

	//should respond with only the players that have with the especified role. Status 200.
	res.json(rolePlayers);
});

app.put("/players", (req, res) => {
	//Should recive player data from request body.
	//Should console.log the response.
	//Response should be {"operation": "add player", "status": "accepted"} with status 200 if the body request is valid.
	//Response should be {"operation": "add player", "status": "refused", "details": "Invalid body"} with status 409 if any property is missing.
	//The Only valid properties are the ones at every player object in data.json.
	const body = req.body;
	const keys = ["name", "lastname", "role", "team"];
	const respAcepted = {operation: "add player", status: "accepted"};
	const respRefused = {
		operation: "add player",
		status: "refused",
		details: "Invalid body",
	};
	let value;

	Object.keys(body).forEach((key) => {
		if (!keys.some((k) => k === key)) {
			value = true;
		}
	});

	if (value) {
		res.status(409).json(respRefused);
		console.log(respRefused);
		return;
	}

	res.json(respAcepted);
	console.log(respAcepted);
	return;
});

app.listen(port, () => {
	console.log("Express server started at port " + port);
});
