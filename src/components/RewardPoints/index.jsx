import React from 'react';

import css from './index.module.scss';

const RewardPoints = ({ points = 0, className }) => {
  let numCount = `${points}`.length;
  let numberDigits = numCount > 3 ? numCount : 3;
  let pointsInArray = `000${points}`.substr(-numberDigits).split('');

  return (
    <div className={`${css.points} ${className}`}>
      {pointsInArray.map((val, i) => (
        <React.Fragment key={i}>
          <span className={css.text} key={`val-1${i}`}>
            {val}
          </span>
          {pointsInArray.length - 1 !== i && <span className={css.line} key={`line-1${i}`}></span>}
        </React.Fragment>
      ))}
    </div>
  );
};

export default RewardPoints;
