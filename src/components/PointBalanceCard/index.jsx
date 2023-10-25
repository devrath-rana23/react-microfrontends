import React from 'react';
import { useNavigate } from '@reach/router';
import { Redux, Slices } from 'spwa-ui-library';
import RewardPoints from '../RewardPoints';
import Button from '../Button';
import { useIntl, FormattedMessage } from 'react-intl';
import css from './index.module.scss';
import pointsBg from '../../assets/kfc-banner.png';
import logo from '../../assets/kfc-reward-logo.svg';
import rwdWtLogo from '../../assets/ar-white.logo.svg';
import arrow from '../../assets/double_Arrow.svg';
import { selectDesktop } from 'spwa-ui-library/esm/redux/store/appSlice';
import classnames from 'classnames';
const { loyaltyConfigSelector } = Slices.loyaltyAccountSlice;

const { useSelector } = Redux;
const { memberPointMetricsSelector } = Slices.loyaltyMemberSlice;

const PointBalanceCard = () => {
  const isDesktop = Redux.useSelector(selectDesktop);
  const { pointBalance } = useSelector(memberPointMetricsSelector);
  const navigate = useNavigate();
  const intl = useIntl();
  const { redemptionThreshold } = useSelector(loyaltyConfigSelector);

  const loyaltyAccount = useSelector(
    ({ loyaltyAccount }) =>
      loyaltyAccount?.loyaltyConfig?.entities?.data?.[intl?.locale]?.homeWidgetImage
  );

  return (
    <>
      {isDesktop ? (
        <div
          className={css.PointBalanceCard}
          style={{ backgroundImage: `url(${pointsBg})` }}
          onClick={() => {
            navigate(`/${intl.locale}/rewards`);
          }}
        >
          <div className={css.cardWrapper}>
            {intl.locale === 'ar' ? (
              <img src={rwdWtLogo} alt="KFC Rewards" />
            ) : (
              <img src={logo} alt="KFC Rewards" />
            )}
            {pointBalance > 0 && (
              <p>
                <FormattedMessage id="your_point_balance" defaultMessage="Your Points Balance" />
              </p>
            )}
          </div>
          {pointBalance > 0 && (
            <div className={css.rewardPoints}>
              <RewardPoints className={css.pointsNumber} points={pointBalance} />
            </div>
          )}
          <div className={css.buttonWrapper}>
            <Button className={css.smallButton} color="light">
              {redemptionThreshold <= pointBalance ? (
                <FormattedMessage id="redeem_now" defaultMessage="Redeem Now" />
              ) : (
                <FormattedMessage id="view_rewards" defaultMessage="View Rewards" />
              )}
              <img className={css.img} src={arrow} alt="right arrow" />
            </Button>
          </div>
        </div>
      ) : (
        <div
          className={css.mobBalanceCard}
          style={{ backgroundImage: `url(${loyaltyAccount?.noPointsLoggedIn})` }}
          onClick={() => {
            navigate(`/${intl.locale}/rewards`);
          }}
        >
          <div className={css.bottomContainer}>
          {pointBalance > 0 && (
            <div className={css.topContainer}>
              <p>
                <FormattedMessage id="your_point_balance" defaultMessage="Your Points Balance" />
              </p>
            </div>
            )}
            <div className={classnames(css.showRewardContainer, {
              [css.pushRight]: pointBalance > 0,
            })}>
              <div>
            {pointBalance > 0 && (
              <RewardPoints className={css.ponitsContainer} points={pointBalance} />
              )}
              </div>
              <div className={css.buttonWrapper} data-point={pointBalance}>
                <Button className={css.smallButton} color="light">
                  {redemptionThreshold <= pointBalance ? (
                    <FormattedMessage id="redeem_now" defaultMessage="Redeem Now" />
                  ) : (
                    <FormattedMessage id="view_reward" defaultMessage="View Rewards" />
                  )}
                  <img className={css.img} src={arrow} alt="right arrow" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PointBalanceCard;
