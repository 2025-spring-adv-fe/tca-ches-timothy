
import './App.css'


interface AppProps {
  timestamp: string;
  magicNumber: number;
}

const App: React.FC<AppProps> = (

  {
    timestamp
    , magicNumber
  }
) => {

  return (
    <div>
      <h1
        className='text-2xl font-bold'
      >
        TCA CHES TIMOTHY
      </h1>
      <p>
        { timestamp } - { magicNumber }
      </p>
      <button
        className='btn btn-secondary btn-soft btn-xl'
      >
        Play Chess
      </button>
    </div>
  )
}

export default App
