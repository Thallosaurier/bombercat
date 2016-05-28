package de.dhbwka.java.bombercat.servercalls;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;

import javax.websocket.Session;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import de.dhbwka.java.bombercat.Client;
import de.dhbwka.java.bombercat.Lobby;
import de.dhbwka.java.bombercat.servercalls.lobby.GetMap;
import de.dhbwka.java.bombercat.servercalls.lobby.LeaveLobby;
import de.dhbwka.java.bombercat.servercalls.lobby.LobbyCall;
import de.dhbwka.java.bombercat.servercalls.lobby.StartGame;
import de.dhbwka.java.bombercat.servercalls.menu.CreateLobby;
import de.dhbwka.java.bombercat.servercalls.menu.GetLobbies;
import de.dhbwka.java.bombercat.servercalls.menu.JoinLobby;
import de.dhbwka.java.bombercat.servercalls.menu.MenuCall;
import de.dhbwka.java.bombercat.servercalls.menu.SetName;

public class Server {

	private static final Logger LOGGER = LoggerFactory.getLogger(Server.class);
	private final Map<String, Lobby> lobbies = new HashMap<String, Lobby>();
	private final Map<String, Client> clients = new HashMap<>();
	// Commands
	private final Map<String, MenuCall> menuCalls = new HashMap<>();
	private final Map<String, LobbyCall> lobbyCalls = new HashMap<>();

	public Server() {
		menuCalls.put("createLobby", new CreateLobby());
		menuCalls.put("joinLobby", new JoinLobby());
		menuCalls.put("getLobbies", new GetLobbies());
		menuCalls.put("setName", new SetName());
		lobbyCalls.put("leaveLobby", new LeaveLobby());
		lobbyCalls.put("startGame", new StartGame());
		lobbyCalls.put("getMap", new GetMap());
	}

	public void addClient(Session session) {
		clients.put(session.getId(), new Client(session));
	}

	public void call(String message, Client client) {
		LOGGER.info("Message: " + message);
		String[] para = message.split(" ");
		for (String string : para) {
			LOGGER.debug(string);
		}
		if (para.length >= 2) {
			String typeCall = para[0];
			String command = para[1];
			String parameter;
			try {
				parameter = para[2];
			} catch (ArrayIndexOutOfBoundsException ex) {
				parameter = "";
			}
			System.out.println(typeCall);
			switch (typeCall) {
			case "menu":
				menuCalls.get(command).run(parameter.split(";"), lobbies, client,
						new HashSet<Client>(clients.values()));
				break;
			case "lobby":
				lobbyCalls.get(command).run(parameter.split(";"), lobbies, client);
				break;
			case "debug":
				System.out.println("debug:");
				for (Client pclient : clients.values()) {
					client.sendMessage(pclient.getSession().getId() + " : " + pclient.getUsername() + " : "
							+ pclient.getLobby().getLobbyName());
				}
				break;
			default:
				client.sendError("No such call");
				break;
			}
		}
	}

	public void removeClient(Client client) {
		clients.remove(client.getSession().getId());
		if (client.getLobby() != null) {
			client.getLobby().removeClient(client, lobbies);
		}
	}
}