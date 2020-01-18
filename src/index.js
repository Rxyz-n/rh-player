import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import AudioProvider from './context/audio.context';
import App from './App';

ReactDOM.render(
  <AudioProvider>
    <App />
  </AudioProvider>,
  document.getElementById('root')
);
