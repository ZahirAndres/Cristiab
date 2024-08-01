import { Request, Response } from 'express';

class GamesController {
  public index(req: Request, resp: Response): void {
    resp.send('Quiubole Raza!!!');
  }
}

export const gamesController = new GamesController(); 