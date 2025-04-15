
import './App.css'
import {
  HashRouter
  , Routes
  , Route
} from 'react-router';


const Home = () => {
  return (
    <>
      <h3
        text-2xl font-bold
      >
        Home
      </h3>
      <button className="btn btn-active btn-secondary btn-lg mt-4">
        Play Chess
      </button>
    </>
  );
};

const App = () => {

  return (
    <div
      className='p-4'
    >
      <HashRouter>
        <Routes>
          <Route 
            path='/'
            element={
              <Home />
            }
          />
        </Routes>
      </HashRouter>
    </div>
  )
}

export default App
