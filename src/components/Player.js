import React, { useEffect, useContext } from 'react';
import WaveSurfer from 'wavesurfer.js';

import { AudioContext } from '../context/audio.context';

let wavesurfer;

function Player() {
  const { loading, playlist } = useContext(AudioContext);

  useEffect(() => {
    if (!loading) {
      wavesurfer = WaveSurfer.create({
        container: '#waveform',
        barGap: 3,
        barWidth: 7,
        cursorWidth: 0,
        barRadius: 1,
        waveColor: '#fff',
        progressColor: 'red'
      });

      wavesurfer.load('/playlist/' + playlist[0]);
    }
  }, [loading]);

  return (
    <div className="player">
      <div id="waveform"></div>
    </div>
  );
}

export default Player;
