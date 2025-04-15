import { useNavigate } from "react-router";

export const Play = () => {
    const nav = useNavigate();

    let turnNumber = 1;
    return (
      <>
        <h3
          className="text-2xl font-bold"
        >
          Play
        </h3>
        <h4
          className="text-lg font-semibold"
        >
          Turn #{turnNumber}
          <button 
            className="btn btn-xs btn-outline btn-light ml-4"
            onClick={
              () => {
                turnNumber = turnNumber + 1;
              }
            }
          >
            +
          </button>
        </h4>
        <button 
          className="btn btn-active btn-secondary btn-lg mt-4"
          onClick={
            () => nav('/')
          }
        >
          Done
        </button>
      </>
    );
  };