import React, { useEffect, useContext } from 'react';
import cx from 'classnames';
import WaveSurfer from 'wavesurfer.js';

import Spinner from './Spinner';
import { AudioContext } from '../context/audio.context';
import './Player.css';

let waveSurfer;

function Player() {
  const {
    loading,
    playlist,
    ready,
    currentIndex,
    getSongInfo,
    isPlaying,
    isFinish,
    isLoop,
    isRandom,
    dispatch
  } = useContext(AudioContext);

  const songInfo = getSongInfo();

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
        handlePlayPause();
      });

      waveSurfer.on('finish', () => {
        dispatch({ type: 'SET_FINISH', payload: true });
      });
    }
    //eslint-disable-next-line
  }, [loading]);

  useEffect(() => {
    if (waveSurfer) {
      dispatch({ type: 'SET_READY_STATUS', payload: false });
      waveSurfer.load('/playlist/' + playlist[currentIndex]);
    }
    //eslint-disable-next-line
  }, [currentIndex]);

  useEffect(() => {
    if (isFinish) {
      dispatch({ type: 'SET_FINISH', payload: false });
      handleNextSong();

      return waveSurfer.un('finish', () => {
        dispatch({ type: 'SET_FINISH', payload: true });
      });
    }
    //eslint-disable-next-line
  }, [isFinish]);

  const handlePlayPause = () => {
    waveSurfer.playPause();
    dispatch({ type: 'SET_PLAYING', payload: waveSurfer.isPlaying() });
  };

  const handleNextSong = () => {
    if (isLoop) {
      waveSurfer.seekTo(0);
      waveSurfer.play();
    } else {
      dispatch({
        type: 'SET_CURRENT_INDEX',
        payload: isRandom
          ? Math.floor(Math.random() * playlist.length)
          : (currentIndex + 1) % playlist.length
      });
    }
  };

  const handleLoop = () => {
    dispatch({ type: 'SET_LOOP', payload: !isLoop });
  };

  const handleRandom = () => {
    dispatch({ type: 'SET_RANDOM', payload: !isRandom });
  };

  const handleForwardBackward = num => () => {
    dispatch({
      type: 'SET_CURRENT_INDEX',
      payload: (currentIndex + num) % playlist.length
    });
  };

  return (
    <div className="player">
      {!ready && <Spinner className="spinner" />}
      {ready && (
        <div className="d-flex flex-column text-uppercase align-self-start">
          <h3 className="mb-1">{songInfo.name}</h3>
          <span className="text-white-50" style={{ fontSize: '.9rem' }}>
            {songInfo.singer}
          </span>
        </div>
      )}
      <div id="waveform" className="my-4" />
      {ready && waveSurfer && (
        <div className="player-actions">
          <i
            className={cx('fas fa-redo', { active: isLoop })}
            title="Loop"
            onClick={handleLoop}
          />
          <i
            className="fas fa-step-backward"
            title="Backward"
            onClick={handleForwardBackward(-1)}
          />
          <i
            className={`fas fa-${isPlaying ? 'pause' : 'play'}`}
            title={isPlaying ? 'Pause' : 'Play'}
            onClick={handlePlayPause}
          />
          <i
            className="fas fa-step-forward"
            title="Forward"
            onClick={handleForwardBackward(1)}
          />
          <i
            className={cx('fas fa-random', { active: isRandom })}
            title="Random"
            onClick={handleRandom}
          />
        </div>
      )}
    </div>
  );
}

export default Player;
