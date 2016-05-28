openSocket();

var webSocket;
var messages = document.getElementById("messages");
var curMsg;
var messages = [];

function openSocket() {
	if (webSocket !== undefined && webSocket.readyState !== WebSocket.CLOSED) {
		writeResponse("WebSocket is already opened.");
		return;
	}

	webSocket = new WebSocket("ws://localhost:8080/BomberCat/echo");
	// webSocket = new WebSocket("ws://172.16.53.248:8080/BomberCat/echo");

	webSocket.onopen = function(event) {
		if (event.data === undefined){			
			return;
		}
	};

	webSocket.onmessage = function(event) {
		messages.push(event.data);
		curMsg = event.data;
		if (curMsg == "Connection Established") {			
			document.getElementById("info").innerHTML = event.data;
		}
	};

	webSocket.onclose = function(event) {
		document.getElementById("info").innerHTML = "Connection closed!";
	};
}

function send() {
	var text = document.getElementById("messageinput").value;
	webSocket.send(text);
}

function sendMsg(msg) {
	webSocket.send(msg);
}

var hasSent = false;
var gotResponse = false;
function sendAndGetMessages(msg, endResponse) {
	if (!hasSent) {
		messages.length = 0;
		curMsg = "";
		sendMsg(msg);
		hasSent = true;
	}
	if (!gotResponse) {
		if (messages[messages.length-1] == endResponse) {
			console.log("gotEndResponse!");
			gotResponse = true;
			hasSent = false;
		}
	}
}

function sendAndGetResponse(msg) {
	if (!hasSent) {
		curMsg = "";
		sendMsg(msg);
		hasSent = true;
	}
	if (!gotResponse) {
		if (curMsg != "") {
			console.log("gotResponse!");
			gotResponse = true;
			hasSent = false;
		}
	}
}

function closeSocket() {
	webSocket.close();
}