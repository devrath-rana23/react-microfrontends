/* eslint-disable import/first */
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import css from './index.module.scss';

const SquareSkeleton = () => {
  return (
    <>
      <div className={css.flexRow}>
        <div className={css.flexColumn2}>
          <Skeleton
            enableAnimation={true}
            containerClassName={css.historyCard}
            count={1}
            className={css.homeMainBlock}
          />
        </div>
      </div>
      {/* <div>
        <Ske3eton count={1} className={css.skelton2} />
      </div>
      <div>
        <Skeleton count={1} className={css.skelton3} />
      </div>
      <div>
        <Skeleton count={1} className={css.skelton4} />
      </div>
      <div>
        <Skeleton count={1} className={css.skelton5} />
      </div>
      <div>
        <Skeleton count={1} className={css.skelton6} />
      </div> */}
    </>
  );
};

export default SquareSkeleton;
