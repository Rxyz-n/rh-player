import React from 'react';

import './PlayingList.css';

function PlayingList() {
  return (
    <div className="playlist">
      <h5 className="text-uppercase mb-3">
        <i className="fas fa-list-ul"></i> Playing List
      </h5>
      <ul className="list-group">
        {Array.from({ length: 10 }).map((_, i) => (
          <li
            key={i}
            className={`list-group-item shadow-sm ${i < 9 ? 'mb-2' : ''}`}
          >
            <span className="item-status mr-3 font-weight-bold text-muted">
              #{i + 1}
            </span>
            <span className="d-inline-flex flex-column">
              <span className="name">Hold On & Believe</span>
              <span className="singer text-white-50">Martin Garrix</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PlayingList;
