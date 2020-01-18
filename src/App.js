import React, { useContext } from 'react';

import { AudioContext } from './context/audio.context';

function App() {
  const audioCtx = useContext(AudioContext);
  console.log(audioCtx);
  return <div className="App">RH-player</div>;
}

export default App;
