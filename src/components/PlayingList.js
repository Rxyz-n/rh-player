import React from 'react';

function PlayingList() {
  return (
    <div className="playlist">
      <h5 className="text-uppercase mb-3">
        <i className="fas fa-list-ul"></i> Playing List
      </h5>
      <ul className="list-group">
        {Array.from({ length: 10 }).map((_, i) => (
          <li key={i} className={`list-group-item ${i < 9 ? 'mb-2' : ''}`}>
            <i className="fas fa-play-circle fa-2x text-white-50 mr-3"></i>
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
