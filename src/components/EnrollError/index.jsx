import React, { useEffect, useState } from 'react';
import css from './index.module.scss';
import { VscChromeClose } from '@react-icons/all-files/vsc/VscChromeClose';
import { FiInfo } from '@react-icons/all-files/fi/FiInfo';
import { FormattedMessage, useIntl } from 'react-intl';
import { Badge } from '../Icons';
import { Redux, Slices } from 'spwa-ui-library';
import { navigate } from '@reach/router';
import {
  KFCLoyaltyTermsCallSupport,
  locationErrorWhileDeeplinkGA,
  rewardUnlockedBackendErrorViewGA,
} from 'spwa-ui-library/esm/utils/helperGA';
import { localizePath } from 'spwa-ui-library/esm/utils/helper';
import { generateCategoryRoute } from 'spwa-ui-library/esm/utils/path';
const { useSelector, useDispatch } = Redux;
const { sendOtp } = Slices.authSlice;
const { selectCurrentCountry, getCurrentProfile } = Slices.profileSlice;
const { selectCountryValidations } = Slices.configSlice;
const { selectFirstCategory } = Slices.categorySlice;
const EnrollError = ({
  type = '',
  message,
  isOops = true,
  isContinueOrder = false,
  replaceOopsTitle = '',
  icon = <VscChromeClose />,
  onButtonClick = () => {},
  ...props
}) => {
  const [errorLabelMsgId, setErrorLabelMsgId] = useState('');
  const [showTerms, setShowTerms] = useState(false);
  const [btnTextId, setBtnTextId] = useState('offer_gotit');
  const [continueOrder, setContinueOrder] = useState(isContinueOrder);
  const errorName = isOops ? 'error_oops' : 'sorry';
  const dispatch = useDispatch();
  const profile = useSelector(getCurrentProfile);
  const intl = useIntl();
  const country = useSelector(selectCurrentCountry);
  const countryValidations = useSelector((state) => selectCountryValidations(state, country));
  const [text, setText] = useState(intl.formatMessage({ id: 'unable_to_enrol' }));
  const lang = intl.locale;
  const firstCategory = useSelector(selectFirstCategory);
  const dealPath = generateCategoryRoute({ category: firstCategory, locale: intl.locale });

  const handleVerifyNumber = (e) => {
    dispatch(
      sendOtp({
        cCode: profile?.cCode,
        phnNo: profile?.phnNo,
        otpVia: 'PHONE',
        sendOtpVia: 'SOCIAL',
        country: profile?.country.toUpperCase(),
      })
    )
      .then((resp) => {
        navigate(`/${lang}/verifyOTP`, {
          replace: true,
          state: {
            cCode: countryValidations?.defaultCCode,
            phnNo: profile?.phnNo,
            component: 'login',
            isDisableEdit: true,
            verifiedEmail: null,
          },
        });
        onButtonClick(e);
      })
      .catch((error) => {
        // TODO: Handle send otp error
      });
  };

  const handleBtnClick = (e) => {
    if (type === 'NON_VERIFIED_PHONE_NUMBER') {
      handleVerifyNumber(e);
    } else if (continueOrder) {
      onButtonClick(e);
      navigate(dealPath);
    } else {
      onButtonClick(e);
    }
  };

  const getLocalizeURL = (target) => {
    return localizePath(target, lang);
  };
  const navigateTo = (path) => (e) => {
    e.preventDefault();
    KFCLoyaltyTermsCallSupport({ eventLabel: 'ClickedKFCLoyaltyHomeTerms' });
    navigate(path);
  };

  useEffect(() => {
    if (type === 'LOCATION_NOT_ENABLED') {
      locationErrorWhileDeeplinkGA();
      setErrorLabelMsgId('non_store_location');
      setShowTerms(true);
      setBtnTextId('continue_order');
      setContinueOrder(true);
    }
    if (type === 'REDEMPTION_FAILED') {
      rewardUnlockedBackendErrorViewGA();
      setErrorLabelMsgId('redemption_failed');
      setBtnTextId('okay');
    }
    if (type === 'NON_VERIFIED_PHONE_NUMBER') {
      setErrorLabelMsgId('');
      setBtnTextId('verify_phone');
    }
    if (type === 'LOGIN_TO_USE_REWARD') {
      setErrorLabelMsgId('');
      setBtnTextId('navigation_login');
    }

    if (type === 'REMOVE_LABEL_AND_TERMS') {
      setErrorLabelMsgId('');
      setShowTerms(false);
    }
    if (type === 'REMOVE_LABEL') {
      setErrorLabelMsgId('');
      setShowTerms(true);
      setContinueOrder(true);
    }
  }, [type]);

  useEffect(() => {
    if (message) {
      setText(message);
    }
  }, [message]);

  return (
    <div className={css.errorContainer}>
      <div className={css.errorBox}>
        <div className={css.badge}>
          <Badge />
        </div>
        <div className={css.warningContainer}>
          <span className={css.warningSign}>{icon}</span>
          <p className={css.warningText}>
            {replaceOopsTitle ? replaceOopsTitle : <FormattedMessage id={errorName} />}
          </p>
        </div>

        <div className={css.errorContent}>
          {errorLabelMsgId && (
            <div className={css.nonLocation}>
              <FormattedMessage id={errorLabelMsgId} />
            </div>
          )}

          <p>{text}</p>

          {showTerms && (
            <div className={css.locationTerms}>
              <p onClick={navigateTo(getLocalizeURL('terms'))}>
                <FormattedMessage id="kfc_Rewards_terms" defaultMessage="KFC Rewards Terms" />
                <span>
                  <FiInfo />
                </span>
              </p>
            </div>
          )}
        </div>
        <button className={css.confirmBtn} onClick={handleBtnClick}>
          <FormattedMessage id={continueOrder ? 'continue_order' : 'offer_gotit'} />
        </button>
      </div>
    </div>
  );
};

export default EnrollError;
