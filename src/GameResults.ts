import { durationFormatter } from "human-readable";

const formatGameDuration = durationFormatter<string>();

const formatLastPlayed = durationFormatter<string>({
    allowMultiples: ["y", "mo", "d"]
})

export interface GameResult {
    winner: string;
    players: string[];
    start: string;
    end: string;
    turnCount: number;

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
    avgTurnsPerGame: string;
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

export const getGeneralFacts = (results: GameResult[]): GeneralFacts => {


    if (results.length === 0) {
        return {
            lastPlayed: "n/a"
            , totalGames: 0
            , shortestGame: "n/a"
            , longestGame: "n/a"
            , avgTurnsPerGame: "0"
        };
    }
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

    const turnSum = results
        .map(
            x => x.turnCount
        )
        .reduce(
            (acc, x) => acc + x
            , 0
        )
    ;

    return {
        lastPlayed: `${formatLastPlayed(lastPlayedInMilliseconds)}  ago`
        , totalGames: results.length
        , shortestGame: formatGameDuration(Math.min(...gameDurationsInMilliseconds))
        , longestGame: formatGameDuration(Math.max(...gameDurationsInMilliseconds))
        , avgTurnsPerGame: (turnSum / results.length).toFixed(2)
    };
};

export const getPreviousPlayers = (
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

export const getGamesByMonth = (results: GameResult[]): Array<[string, number]> => {

    const gameStartMonths = results.map(

        x => new Date(x.start).toLocaleString(
            'default'
            , {
                month: 'short'
            }
        )
    );

    const groupedStartMonths = Map.groupBy(
        gameStartMonths
        , x => x
    );

    console.log(
        gameStartMonths
        , groupedStartMonths
    );

    return [
        'Jan'
        , 'Feb'
        , 'Mar'
        , 'Apr'
        , 'May'
        , 'Jun'
        , 'Jul'
        , 'Aug'
        , 'Sep'
        , 'Oct'
        , 'Nov'
        , 'Dec'
    ].map(
        x => [
            x 
            , groupedStartMonths.get(x)?.length ?? 0
        ]
    );
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

