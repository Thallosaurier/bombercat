package de.dhbwka.java.bombercat.servercalls.ingame;

import java.awt.Point;
import java.util.Map.Entry;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;

import de.dhbwka.java.bombercat.Client;
import de.dhbwka.java.bombercat.game.GameMain;
import de.dhbwka.java.bombercat.game.Player;

public class GetPlayerPositions implements IngameCall {

	@Override
	public void run(String[] parameter, GameMain game, Client client) {
		JSONArray obj = new JSONArray();
		for (Entry<Point, Player> entry : game.getMap().getPlayers().entrySet()) {
			JSONObject spawn = new JSONObject();
			spawn.put("x", entry.getKey().getX());
			spawn.put("y", entry.getKey().getY());
			spawn.put("username", entry.getValue().getClient().getUsername());
			obj.add(spawn);
		}
		game.sendToAllPlayers("positions", obj.toJSONString());
	}

}
