import React from 'react';
import cx from 'classnames';

import './Spinner.css';

function Spinner({ className }) {
  return (
    <div className={cx('circles-to-rhombuses-spinner', className)}>
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="circle"></div>
    </div>
  );
}

export default Spinner;
