import React from 'react';

import PlayingList from './components/PlayingList';

function App() {
  return (
    <div className="App">
      <div className="player-container">
        <div className="player-inner w-100 h-100 p-3">
          <div className="player">Player</div>
          <PlayingList />
        </div>
      </div>
    </div>
  );
}

export default App;
