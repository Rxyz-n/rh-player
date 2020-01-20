import React, { useContext, useLayoutEffect } from 'react';
import cx from 'classnames';

import { AudioContext } from '../context/audio.context';
import './PlayingList.css';

function PlayingList() {
  const { playlist, getSongInfo, currentIndex, dispatch } = useContext(
    AudioContext
  );
  const playlistLength = playlist.length;

  useLayoutEffect(() => {
    const activeItem = document.querySelector('li.active');
    if (activeItem) {
      activeItem.scrollIntoView({
        behavior: 'smooth',
        block: 'end'
      });
    }
  }, [currentIndex]);

  const handleChangeSong = idx => () => {
    if (idx !== currentIndex) {
      dispatch({ type: 'SET_CURRENT_INDEX', payload: idx });
    }
  };

  return (
    <div className="playlist">
      <h5 className="text-uppercase mb-3">
        <i className="fas fa-list-ul mr-1" /> Playing List
      </h5>
      <ul className="list-group">
        {playlist.map((_, idx) => {
          const { name, singer } = getSongInfo(idx);
          const isActive = idx === currentIndex;
          const isLastItem = idx + 1 === playlistLength;

          return (
            <li
              key={idx}
              onClick={handleChangeSong(idx)}
              className={cx('list-group-item shadow-sm', {
                active: isActive,
                'mb-2': !isLastItem
              })}
            >
              <span className="item-status">
                {isActive ? (
                  <i className="fas fa-play" style={{ fontSize: '1.1rem' }} />
                ) : (
                  <span className="font-weight-bold text-muted">
                    #{idx + 1}
                  </span>
                )}
              </span>
              <span className="d-inline-flex flex-column">
                <span className="name">{name}</span>
                <span className="singer text-white-50">{singer}</span>
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default PlayingList;
