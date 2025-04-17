export interface GameResult {
    winner: string;
    players: string[];
    start: string;
    end: string;

};

export interface LeaderboardEntry {
    wins: number;
    losses: number;
    average: string;
    player: string;
}

export interface GeneralFacts {
    lastPlayed: string;
    totalGames: number;
    shortestGame: string;
    longestGame: string;
};

export const getLeaderboard = (
    results: GameResult[]
    ): LeaderboardEntry[] => 
    getPreviousPlayers(results)
        .map(
            x => getLeaderboardEntry(
                    results
                    , x
                )
        )
        .sort(
            (a, b) => Number(b.average) - Number(a.average)
        )
;

const getGeneralFacts = (results: GameResult[]): GeneralFacts => {

    // Calcs for lastPlayed...
    const now = Date.now();

    const gameEndTimesInMilliseconds = results.map(
        x => now - Date.parse(x.end)
    );

    const lastPlayedInMilliseconds = Math.min(...gameEndTimesInMilliseconds);

    // console.log(
    //     gameEndTimesInMilliseconds
    // );

    // Calcs for shortest/longest...
    const gameDurationsInMilliseconds = results.map(
        x => Date.parse(x.end) - Date.parse(x.start)
    );

    return {
        lastPlayed: `${lastPlayedInMilliseconds / 1000 / 60 / 60 / 24} days ago`
        , totalGames: results.length
        , shortestGame: `${Math.min(...gameDurationsInMilliseconds) / 1000 / 60} minutes`
        , longestGame: `${Math.max(...gameDurationsInMilliseconds) / 1000 / 60} minutes`
    };
};

// helper function

const getLeaderboardEntry = (
    results: GameResult[]
    , player: string
): LeaderboardEntry => {

    const totalGamesForPlayer = results.filter(
        x => x.players.some(
            y => player === y
        )
    ).length;

    // console.log(
    //     totalGamesForPlayer
    // );

    const wins = results.filter(
        x => x.winner === player 
    ).length;

    // console.log(
    //     wins
    // );

    const avg = totalGamesForPlayer > 0
        ? wins / totalGamesForPlayer
        : 0
    ;

    return {
        wins: wins
        , losses: totalGamesForPlayer - wins
        , average: avg.toFixed(3)
        , player: player
    };
};

const getPreviousPlayers = (
    results: GameResult[]
) => {
    const allPlayersForAllGamesWithDupes = results.flatMap(
        x => x.players
    );

    return [
        ...new Set(allPlayersForAllGamesWithDupes)
    ].sort(
        (a, b) => a.localeCompare(b)
    );
};