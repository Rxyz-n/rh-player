import React, { createContext, useEffect, useReducer } from 'react';
import axios from 'axios';

const AudioContext = createContext();

const initState = {
  loading: true,
  ready: false,
  playlist: [],
  currentIndex: 0
};

function audioReducer(state, { type, payload }) {
  switch (type) {
    case 'SET_PLAYLIST':
      return { ...state, loading: false, playlist: payload };
    case 'SET_READY_STATUS':
      return { ...state, ready: payload };
    default:
      return state;
  }
}

function AudioProvider({ children }) {
  const [state, dispatch] = useReducer(audioReducer, initState);

  useEffect(() => {
    axios
      .get('/playlist')
      .then(({ data }) => {
        dispatch({ type: 'SET_PLAYLIST', payload: data });
      })
      .catch(() => {
        console.error('OH NOOOOO! SUMTHIN WENT WRONG :(');
      });
  }, []);

  const getSongInfo = () => {
    const currentSong = state.playlist[state.currentIndex];
    if (currentSong) {
      const ext = /.mp3|.wav|.ogg|.webm|.aac|.wma|.flac/i;
      const [name, singer] = currentSong.replace(ext, '').split('-');
      return { name, singer };
    }

    return '';
  };

  return (
    <AudioContext.Provider value={{ ...state, dispatch, getSongInfo }}>
      {children}
    </AudioContext.Provider>
  );
}

export { AudioContext, AudioProvider as default };
