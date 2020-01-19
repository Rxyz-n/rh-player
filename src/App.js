import React from 'react';

import Player from './components/Player';
import PlayingList from './components/PlayingList';

function App() {
  return (
    <div className="App">
      <div className="player-container">
        <div className="player-inner w-100 h-100 p-3">
          <Player />
          <PlayingList />
        </div>
      </div>
    </div>
  );
}

export default App;
