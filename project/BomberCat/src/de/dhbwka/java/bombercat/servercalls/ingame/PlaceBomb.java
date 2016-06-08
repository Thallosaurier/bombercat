package de.dhbwka.java.bombercat.servercalls.ingame;

import de.dhbwka.java.bombercat.Client;
import de.dhbwka.java.bombercat.game.GameMain;

public class PlaceBomb implements IngameCall {

	@Override
	public void run(String[] parameter, GameMain game, Client client) {
		int x = Integer.parseInt(parameter[0]);
		int y = Integer.parseInt(parameter[1]);
		game.getMap().addBomb(x, y);
		game.sendToAllPlayers("bombPlaced", x + ";" + y + ";" + game.getPlayer(client).getExplosionSize());
	}

}
