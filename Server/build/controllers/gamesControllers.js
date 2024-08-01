"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gamesController = void 0;
class GamesController {
    index(req, resp) {
        resp.send('Quiubole Raza!!!');
    }
}
exports.gamesController = new GamesController();
