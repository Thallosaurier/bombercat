openSocket();

var webSocket;
var messages = document.getElementById("messages");
var curMsg;
var messages = [];
var connected = false;

function openSocket() {
	if (webSocket !== undefined && webSocket.readyState !== WebSocket.CLOSED) {
		writeResponse("WebSocket is already opened.");
		return;
	}

	webSocket = new WebSocket(serverIP);

	webSocket.onopen = function(event) {
		if (event.data === undefined) {
			return;
		}
	};
	
	webSocket.onerror = function (event) {
        console.log("-> ! ERROR ! <- " + event.data);
    };

	webSocket.onmessage = function(event) {
		var decodedMsg = decodeURIComponent(event.data);
		if (logServerMessages) {
			console.log("RECV: " + decodedMsg);
		}
		messages.push(decodedMsg);
		curMsg = decodedMsg;
		var msg = new Message();
		if (msg.get("info", "connection")){
			connected = true;
		}
	};
}

function send() {
	var text = document.getElementById("messageinput").value;
	webSocket.send(text);
}

function sendMsg(msg) {
	if (logSendMessages) {		
		console.log("SEND: " + msg);
	}
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
		if (messages[messages.length - 1] == endResponse) {
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
			gotResponse = true;
			hasSent = false;
		}
	}
}

function closeSocket() {
	webSocket.close();
}
