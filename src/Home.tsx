import { useNavigate } from "react-router";
import { GeneralFacts, LeaderboardEntry } from "./GameResults";
import { useEffect } from "react";

export const AppTitle = "Chess";

interface HomeProps {
    leaderboardData: LeaderboardEntry[];
    setTitle: (t: string) => void;
    generalFacts: GeneralFacts;
    gamesByMonthData: Array<[string, number]>;
};


export const Home: React.FC<HomeProps> = ({
  leaderboardData
  , setTitle
  , generalFacts
  , gamesByMonthData
}) => {


    useEffect(
      () => setTitle(AppTitle)
      , []
    );

    const nav = useNavigate();
    return (
      <>
        <button 
            className="btn btn-active btn-secondary btn-lg mt-4"
            onClick={
                () => nav("/setup")
            }
        >
          Play Chess
        </button>

        <div 
          className="card bg-base-100 w-full shadow-lg mt-4"
        >
          <div 
            className="card-body"
          >
            <h2 
              className="card-title"
            >
              General
            </h2>
            <div className="overflow-x-auto">
              <table className="table">
                <tbody>
                  <tr
                  >
                    <td>
                      Last Played
                    </td>
                    <td>{generalFacts.lastPlayed}</td>

                  </tr>

                  <tr
                  >
                    <td>
                      Total Games
                    </td>
                    <td>{generalFacts.totalGames}</td>

                  </tr>

                  <tr
                  >
                    <td>
                      Shortest Game
                    </td>
                    <td>{generalFacts.shortestGame}</td>

                  </tr>

                  <tr
                  >
                    <td>
                      Longest Game
                    </td>
                    <td>{generalFacts.longestGame}</td>

                  </tr>
                  <tr
                  >
                    <td>
                      AVG Turns per Game
                    </td>
                    <td>{generalFacts.avgTurnsPerGame}</td>

                  </tr>

                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div 
          className="card bg-base-100 w-full shadow-lg mt-4"
        >
          <div 
            className="card-body"
          >
            <h2 
              className="card-title"
            >
              Leaderboard
            </h2>
            {
              leaderboardData.length > 0
                ? (
                  <div className="overflow-x-auto">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>W</th>
                          <th>L</th>
                          <th>AVG</th>
                          <th>PLAYER</th>
                        </tr>
                      </thead>
                      <tbody>

                        {
                          leaderboardData.map(
                            x => (
                              <tr
                                key={x.player}
                              >
                                <td>
                                  {x.wins}
                                </td>
                                <td>{x.losses}</td>
                                <td>{x.average}</td>
                                <td>{x.player}</td>
                              </tr>
                            )
                          )
                        }
                        
                      </tbody>
                    </table>
                  </div>
                )
                : (
                  <p
                    className="mx-3 mb-3"
                  >
                    Play a game to see the leaderboard
                  </p>
                )
            }
            

          </div>
        </div>
        <div 
          className="card bg-base-100 w-full shadow-lg mt-4"
        >
          <div 
            className="card-body"
          >
            <h2 
              className="card-title"
            >
              Games By Month
            </h2>
            {
              leaderboardData.length > 0
                ? (
                  <div className="overflow-x-auto">
                    <table className="table">
                      <thead>
                        <tr>
                          <th>Month</th>
                          <th># OF GAMES</th>

                        </tr>
                      </thead>
                      <tbody>

                        {
                          gamesByMonthData.map(
                            x => (
                              <tr
                                key={x[0]}
                              >
                                <td>
                                  {x[0]}
                                </td>
                                <td>{x[1]}</td>
                              </tr>
                            )
                          )
                        }
                        
                      </tbody>
                    </table>
                  </div>
                )
                : (
                  <p
                    className="mx-3 mb-3"
                  >
                    Play a game to see the leaderboard
                  </p>
                )
            }
            

          </div>
        </div>

      </>
    );
  };