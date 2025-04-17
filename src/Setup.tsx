import { useEffect } from "react";
import { useNavigate } from "react-router";

interface SetupProps {
  setTitle: (t:string) => void;
};

export const Setup: React.FC<SetupProps> = ({
  setTitle
}) => {

    useEffect(
      () => setTitle("Setup")
      , []
    )

    const game = useNavigate();
    return (
      <>

        <button 
          className="btn btn-active btn-secondary btn-lg mt-4"
          onClick={
            () => game('/play')
          }
        >
          Start Playing
        </button>
      </>
    );
  };