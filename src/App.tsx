
import './App.css'
import {
  HashRouter
  , Routes
  , Route
} from 'react-router';
import { AppTitle, Home } from './Home';
import { Setup } from './Setup';
import { Play } from './Play';
import { useEffect, useRef, useState } from 'react';
import { GameResult, getGeneralFacts, getLeaderboard, getPreviousPlayers, getGamesByMonth } from './GameResults';
import localforage from 'localforage';

const dummyGameResults: GameResult[] = [
  {
      winner: "Hermione"
      , players: [
          "Hermione"
          , "Harry"
          , "Ron"
      ]
      , start: "2025-03-01T18:20:41.576Z"
      , end: "2025-03-01T18:35:42.576Z" 
      , turnCount: 14      
  }
  , {
      winner: "Ron"
      , players: [
          "Hermione"
          , "Ron"
      ]
      , start: "2025-03-05T18:40:27.576Z"
      , end: "2025-03-05T18:45:42.576Z"    
      , turnCount: 22    
  }
];


const App = () => {

  // hooks

  const emailModalRef = useRef<HTMLDialogElement | null>(null);

  const [gameResults, setGameResults] = useState<GameResult[]>(dummyGameResults)
  //const [gameResults, setGameResults] = useState<GameResult[]>([])
  const [title, setTitle] = useState(AppTitle);
  const [currentPlayers, setCurrentPlayers] = useState<string[]>([]);

  const [lightMode, setlightMode] = useState(true);
  const [emailOnModal, setEmailOnModal] =useState("");

  useEffect(
    () => {
      let ignore = false;
      const loadLightMode = async () => {
        const savedLightMode = await localforage.getItem<boolean>("lightMode") ?? true;

        if (!ignore) {
          setlightMode(savedLightMode)
        }
      }

      

      loadLightMode();

      return () => {
        ignore = true;
      };
    }
    , [lightMode]
  )

  useEffect(
    () => {
      const loadEmail = async () => {
        const savedEmail = await localforage.getItem<string>("email") ?? "";

        if (!ignore) {
          setEmailOnModal(savedEmail)
        }
      }

      let ignore = false;

      loadEmail();

      return () => {
        ignore = true;
      };
    }
    , []
  )

  const addNewGameResult = (newGameResult: GameResult) => setGameResults(
    [
      ...gameResults
      , newGameResult
    ]
  )

  return (
    <div
      className='p-0 overflow-x-hidden min-h-screen'
      data-theme={lightMode ? "light" : "dark"}
    >
      <div className="navbar bg-base-300 shadow-lg overflow-x-hidden flex" >
        <h1 className="text-xl font-bold">
        { title }
        </h1>
        <div className="flex gap-1 ml-auto">
          {
            AppTitle === title && (
              <button 
                className="btn btn-ghost"
                onClick={
                  () => emailModalRef.current?.showModal()
                }
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="size-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 0 1 1.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.559.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.894.149c-.424.07-.764.383-.929.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 0 1-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.398.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 0 1-.12-1.45l.527-.737c.25-.35.272-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.108-1.204l-.526-.738a1.125 1.125 0 0 1 .12-1.45l.773-.773a1.125 1.125 0 0 1 1.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                </svg>

              </button>
            )
          }
          
          <label className="swap swap-rotate">
            {/* this hidden checkbox controls the state */}
            <input 
              type="checkbox" 
              checked={!lightMode}
              onChange={
                async () => {
                  const savedLightMode = await localforage.setItem("lightMode", !lightMode);
                  setlightMode(savedLightMode)
                }
              }
            />

            {/* sun icon */}
            <svg
              className="swap-on h-6 w-6 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24">
              <path
                d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
            </svg>

            {/* moon icon */}
            <svg
              className="swap-off h-6 w-6 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24">
              <path
                d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
            </svg>
          </label>
        </div>
        

      </div>

      <dialog 
        ref={emailModalRef}
        className="modal modal-bottom sm:modal-middle"
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Enter your email to load or save your game
          </h3>
          <p className="py-4">
            <input 
              type="text" 
              placeholder="Enter new email address..." 
              className={"input"}
              value={emailOnModal}
              onChange={
                (e) => setEmailOnModal(e.target.value)
              }
              />
          </p>
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button 
                className="btn"
                onClick={
                  async () => await localforage.setItem(
                    "email"
                    , emailOnModal
                  )
                }
              >
                save
              </button>
            </form>
          </div>
        </div>
      </dialog>

      <div className="p-4">
        <HashRouter>
          <Routes>
            <Route 
              path='/'
              element={
                <Home 
                  leaderboardData={
                    getLeaderboard(gameResults)
                  }
                  setTitle={setTitle}
                  generalFacts={
                    getGeneralFacts(gameResults)
                  }
                  gamesByMonthData={
                    getGamesByMonth(gameResults)
                  }
                />
              }
            />
            <Route 
              path='/setup'
              element={
                <Setup  
                  setTitle={setTitle}
                  previousPlayers={getPreviousPlayers(gameResults)}
                  setCurrentPlayers={setCurrentPlayers}
                />
              }
            />
            <Route 
              path='/play'
              element={
                <Play 
                  addNewGameResult={addNewGameResult}
                  setTitle={setTitle}
                  currentPlayers={currentPlayers}
                />
              }
            />
          </Routes>
        </HashRouter>
      </div>
    </div>
  )
}

export default App
