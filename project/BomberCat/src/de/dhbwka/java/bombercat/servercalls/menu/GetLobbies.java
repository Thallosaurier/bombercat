package de.dhbwka.java.bombercat.servercalls.menu;

import java.util.Map;
import java.util.Set;

import org.json.simple.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import de.dhbwka.java.bombercat.Client;
import de.dhbwka.java.bombercat.Lobby;

public class GetLobbies implements MenuCall {

	private static final Logger LOGGER = LoggerFactory.getLogger(GetLobbies.class);

	@Override
	public void run(String[] parameter, Map<String, Lobby> lobbies, Client client, Set<Client> clients) {
		client.sendMessage("lobbylist begin");
		for (Lobby lobby : lobbies.values()) {
			JSONObject obj = new JSONObject();
			obj.put("name", lobby.getLobbyName());
			obj.put("user", lobby.getClientNumber());
			client.sendMessage(obj.toJSONString());
			LOGGER.info(obj.toJSONString());
		}
		client.sendMessage("lobbylist end");
	}
}
