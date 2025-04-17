import { useNavigate } from "react-router";
import { GeneralFacts, LeaderboardEntry } from "./GameResults";
import { useEffect } from "react";

export const AppTitle = "Chess";

interface HomeProps {
    leaderboardData: LeaderboardEntry[];
    setTitle: (t: string) => void;
    generalFacts: GeneralFacts;
};


export const Home: React.FC<HomeProps> = ({
  leaderboardData
  , setTitle
  , generalFacts
}) => {

    console.log(
      generalFacts
    )
    useEffect(
      () => setTitle(AppTitle)
      , []
    );

    setTitle(AppTitle);
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
                  <p>
                    Play a game to see the leaderboard
                  </p>
                )
            }
            

          </div>
        </div>
      </>
    );
  };