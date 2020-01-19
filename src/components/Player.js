import React, { useEffect, useContext } from 'react';
import WaveSurfer from 'wavesurfer.js';

import { AudioContext } from '../context/audio.context';

let waveSurfer;

function Player() {
  const { loading, playlist, dispatch, ...ctx } = useContext(AudioContext);
  const songInfo = ctx.getSongInfo();

  useEffect(() => {
    if (!loading && playlist.length) {
      waveSurfer = WaveSurfer.create({
        container: '#waveform',
        barGap: 3,
        barWidth: 7,
        cursorWidth: 0,
        barRadius: 1,
        waveColor: '#fff',
        progressColor: 'red'
      });

      waveSurfer.load('/playlist/' + playlist[0]);

      waveSurfer.on('ready', () => {
        dispatch({ type: 'SET_READY_STATUS', payload: true });
      });
    }
    //eslint-disable-next-line
  }, [loading]);

  return (
    <div className="player">
      {ctx.ready && (
        <div className="d-flex flex-column text-uppercase align-self-start">
          <h3 className="mb-1">{songInfo.name}</h3>
          <span className="text-white-50">{songInfo.singer}</span>
        </div>
      )}
      <div id="waveform" className="mt-4"></div>
    </div>
  );
}

export default Player;
