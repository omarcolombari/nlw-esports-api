import { Request, Response } from "express";
import CreateAdService from "../services/ads/createAd";
import FindDiscordByAd from "../services/ads/findDiscordByAd";
import ListAdsByGame from "../services/ads/listAdsByGame.";

export default class AdController {
  async store(req: Request, res: Response) {
    const {
      discord,
      hourEnd,
      hourStart,
      name,
      useVoiceChannel,
      weekDays,
      yearsPlaying,
    } = req.body;

    const { id: gameId } = req.params;

    const createAd = new CreateAdService();
    const ad = await createAd.execute({
      discord,
      gameId,
      hourEnd,
      hourStart,
      name,
      useVoiceChannel,
      weekDays,
      yearsPlaying,
    });
    return res.status(201).json(ad);
  }

  async showDiscord(req: Request, res: Response) {
    const { id } = req.params;

    const findDiscordByAd = new FindDiscordByAd();
    const discord = findDiscordByAd.execute(id);

    return res.json(discord);
  }

  async listByGame(req: Request, res: Response) {
    const { id } = req.params;

    const listAdsByGame = new ListAdsByGame();
    const ads = listAdsByGame.execute(id);

    return res.json(ads);
  }
}
