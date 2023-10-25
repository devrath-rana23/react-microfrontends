import React from 'react';
import UnlockRewardLink from '../UnlockRewardLink';
import css from './index.module.scss';

const UserReward = () => {
  return (
    <>
      <div className={css.UserReward}>
        <div className={css.rewardLink}>
          <UnlockRewardLink />
        </div>
      </div>
    </>
  );
};

export default UserReward;
