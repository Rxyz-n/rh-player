import React, { useContext } from 'react';

import Spinner from './components/Spinner';
import Player from './components/Player';
import PlayingList from './components/PlayingList';
import { AudioContext } from './context/audio.context';

function App() {
  const { loading } = useContext(AudioContext);

  return (
    <div className="App">
      {loading ? (
        <Spinner />
      ) : (
        <div className="player-container">
          <div className="player-inner w-100 h-100 p-3">
            <Player />
            <PlayingList />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
