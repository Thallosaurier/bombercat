var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");

var background = new Sprite();
var hero = new Sprite();

var soundtrack = new Audio(
		'https://raw.githubusercontent.com/BomberCatDHBW/bombercat/master/Soundtrack/BomberCatSoundtrackPrototype001.mp3');

hero.load("img/hero.png");
background.load("img/background.png");

bombs = new Bombs();

var gameState = "mainMenuState";// mainMenuState, playState, preGameLobbyState
// createLobbyState
var player = new Player();
var otherPlayer = new Player();
var playButton = new Button();
var backButton = new Button();
var nameField = new TextField();
var joinLobbyButton = new Button();
var createLobbyButton = new Button();
var createButton = new Button();
var lobbyNameField = new TextField();
var nextButton = new Button();
var previousButton = new Button();
setup();

function setup() {
	bombs.load("img/bomb.png");
	playButton.setText("Play Game!", 50);
	nameField.setLabelText("Name: ", 30);
	backButton.setText("Back", 40);
	joinLobbyButton.setText("Join Lobby", 40);
	createLobbyButton.setText("Create Lobby", 45);
	createButton.setText("Create", 45);
	lobbyNameField.setLabelText("Lobby Name: ", 30);
	nextButton.setText(">", 30);
	previousButton.setText("<", 30);
}

function drawStroked(text, fontSize, x, y) {
	context.font = fontSize + "px Sans-serif";
	context.strokeStyle = 'black';
	context.lineWidth = 3;
	context.strokeText(text, x, y);
	context.fillStyle = 'white';
	context.fillText(text, x, y);
}

function mainMenuState() {
	// background.draw(0, 0);

	playButton.draw(50, 200, canvas.width - 100, 80);
	nameField.draw(50, 140, canvas.width - 100, 50);

	if (playButton.isClicked() && nameField.text.length >= 3) {
		if (connected) {
			gameState = "preLobbyState";
			sendMsg("menu setName " + nameField.text);
			// soundtrack.play();
		} else {
			playButton.setText("No Connection to Server", 50)
		}
	}
}

function preLobbyState() {

	joinLobbyButton.draw(50, 200, canvas.width - 100, 80);
	createLobbyButton.draw(50, 300, canvas.width - 100, 80);

	if (joinLobbyButton.isClicked()) {
		gameState = "lobbyListState";
	}
	if (createLobbyButton.isClicked()) {
		gameState = "createLobbyState";
	}
}

var lobby = new Lobby();
var lobbyButtons = new Array();

var isLobbyListStateLoaded = false;
function loadLobbyListState() {
	if (!gotResponse) {
		lobbyButtons.length = 0;
		sendAndGetMessages("menu getLobbies", "lobbylist end");
	} else {
		for (var i = 0; i < messages.length; i++) {
			if (messages[i] != "lobbylist begin"
					&& messages[i] != "lobbylist end") {
				var lobbyInfo = JSON.parse(messages[i]);
				var tmpButton = new Button();
				tmpButton.setText(lobbyInfo.name, 16);
				lobbyButtons.push(tmpButton);
			}
		}
		gotResponse = false;
		isLobbyListStateLoaded = true;
	}
}

function lobbyListState() {
	if (!isLobbyListStateLoaded) {
		loadLobbyListState()
	}
	// background.draw(0, 0);
	for (var i = 0; i < lobbyButtons.length; i++) {
		lobbyButtons[i].draw(50, 50 + i * 35, canvas.width - 100, 30);
		if (lobbyButtons[i].isClicked()) {
			lobby.name = lobbyButtons[i].text;
			lobby.players.length = 0;
			sendMsg("menu joinLobby " + lobbyButtons[i].text);
			gameState = "preGameLobbyState";
		}
	}
	backButton.draw(50, 700, 100, 60);
	if (backButton.isClicked()) {
		gameState = "preLobbyState";
		isLobbyListStateLoaded = false;
	}
}

var createLobbyLoaded = false;
var mapsObject;
var curMap = 0;
function loadCreateLobby() {
	if (!gotResponse) {
		sendAndGetResponse("lobby getMapNames");
	} else {
		mapsObject = JSON.parse(curMsg);
		for (var i = 0; i < Object.keys(mapsObject.maps).length; i++) {
			console.log(mapsObject.maps[i]);
		}
		gotResponse = false;
		createLobbyLoaded = true;
	}
}

var displayMapLoaded = false;
function createLobbyState() {
	if (!createLobbyLoaded) {
		loadCreateLobby();
	} else {
		if (!gotResponse) {
			if (!map.loaded) {
				console.log("getMap " + mapsObject.maps[curMap]);
				map.getMap(mapsObject.maps[curMap]);
			}
		} else {
			console.log("map parsed");
			gotResponse = false;
			map.parse();
			displayMapLoaded = true;
		}
		if (map.loaded) {
			map.drawMini(200, 200, 0.5);
		}
		if (curMap != 0) {
			previousButton.draw(50, 400, 50, 50);
			if (previousButton.isClicked()) {
				curMap--;
				displayMapLoaded = false;
				map.loaded = false;
				console.log(curMap);
			}
		}
		if (displayMapLoaded = true) {
			if (curMap < Object.keys(mapsObject.maps).length - 1) {
				nextButton.draw(660, 400, 50, 50);
				if (nextButton.isClicked()) {
					curMap++;
					displayMapLoaded = false;
					map.loaded = false;
					console.log(curMap);
				}
			}
		}
	}
	backButton.draw(50, 700, 100, 60);
	lobbyNameField.draw(50, 140, canvas.width - 100, 50);

	if (createButton.isClicked() && lobbyNameField.text.length >= 3) {
		lobby.name = lobbyNameField.text
		sendMsg("menu createLobby " + lobbyNameField.text);
		sendMsg("lobby setLobbyMap " + mapsObject.maps[curMap]);
		gameState = "preGameLobbyState";
		lobby.players.length = 0;
	}

	if (backButton.isClicked()) {
		gameState = "preLobbyState";
	}
	createButton.draw(canvas.width - 200, 700, 150, 60);
}

var isPlayStateLoaded = false;
var map = new Map();
function loadPlayState() {
	if (!gotResponse) {
		map.getLobbyMap();
	} else {
		gotResponse = false;
		isPlayStateLoaded = true;
		map.parse();
	}
}

function playState() {
	if (!isPlayStateLoaded) {
		loadPlayState();
	} else {
		// map.drawMini(100,100, 0.5);
		map.draw();
		hero.draw(player.x, player.y);
		bombs.draw();
	}

	if (mouse.clicked) {
		player.x = mouse.x;
		player.y = mouse.y;
		// var jsonString = JSON.stringify(player);
		// sendMsg(jsonString);
	}

	if (curMsg) {
		if (curMsg[0] == '{') {
			// var jsObject = JSON.parse(curMsg);
			// var jsonString = JSON.stringify(player);
			// otherPlayer.x = jsObject.x;
			// otherPlayer.y = jsObject.y;
		}
	}
	// hero.draw(otherPlayer.x, otherPlayer.y);
}

function loadPreGameLobbyState() {
	if (!gotResponse) {
		lobby.players.length = 0;
		lobby.leader = 0;
		map.getLobbyMap();
	} else {
		gotResponse = false;
		preGameLobbyLoaded = true;
		map.parse();
		curMsg = "";
		sendMsg("lobby getLobbyPlayers");
	}
}

var preGameLobbyLoaded = false;
function preGameLobbyState() {
	if (!preGameLobbyLoaded) {
		loadPreGameLobbyState();
	} else {
		if (map.loaded) {
			map.drawMini(50, 200, 0.5);
		}
		if (curMsg.indexOf('{"leader":') > -1) {
			lobby.players.length = 0;
			var playersObject = JSON.parse(curMsg);
			lobby.leader = playersObject.leader;
			for (var i = 0; i < Object.keys(playersObject.players).length; i++) {
				lobby.players.push(playersObject.players[i]);
			}
			curMsg = "";
		}
		drawStroked((lobby.players.length + 1) + "/8" + " Players: ", 26, 600,
				50 + 35);
		if (lobby.leader != null && lobby.leader != "") {
			drawStroked("* [" + lobby.leader + "]", 24, 630, 50 + (2) * 35);
		}
		if (lobby.players.length > 0) {
			for (var i = 0; i < lobby.players.length; i++) {
				drawStroked("- " + lobby.players[i], 22, 630, 55 + (i + 3) * 35);
			}
		}
	}
	drawStroked("LOBBY: " + lobby.name, 60, 60, 60);
	drawStroked("waiting for host to start the game", 30, 60, 90);
	backButton.draw(50, 700, 100, 60);

	if (curMsg == "Lobby closed") {
		gameState = "preLobbyState";
		isLobbyListStateLoaded = false;
		map.loaded = false;
		preGameLobbyLoaded = false;
	}

	if (backButton.isClicked()) {
		isLobbyListStateLoaded = false;
		gameState = "preLobbyState";
		sendMsg("lobby leaveLobby");
		map.loaded = false;
		preGameLobbyLoaded = false;
	}
}

function draw() {
	context.clearRect(0, 0, canvas.width, canvas.height);
	if (gameState == "mainMenuState") {
		mainMenuState();
	} else if (gameState == "preLobbyState") {
		preLobbyState();
	} else if (gameState == "createLobbyState") {
		createLobbyState();
	} else if (gameState == "lobbyListState") {
		lobbyListState();
	} else if (gameState == "preGameLobbyState") {
		preGameLobbyState();
	} else {
		playState();
	}
	mouse.clicked = false;
}

var FPS = 60;
setInterval(function() {
	draw();
}, 1000 / FPS);
