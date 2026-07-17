import { getGames } from "../services/game.service";


export function useGames(){

    const games = getGames();


    return {
        games
    };

}