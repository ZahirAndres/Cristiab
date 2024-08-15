"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gamesController = void 0;
class GamesController {
    index(req, resp) {
        resp.send('DB is connected');
    }
}
exports.gamesController = new GamesController();
