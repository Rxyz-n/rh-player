import React, { createContext, useEffect, useReducer } from 'react';
import axios from 'axios';

const audio = new Audio();
const AudioContext = createContext();

const initState = {
  loading: true,
  playlist: []
};

function audioReducer(state, { type, payload }) {
  switch (type) {
    case 'SET_PLAYLIST':
      return { ...state, loading: false, playlist: payload };
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

  return (
    <AudioContext.Provider value={{ ...state, audio }}>
      {children}
    </AudioContext.Provider>
  );
}

export { AudioContext, AudioProvider as default };
