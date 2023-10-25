import React, { useCallback, useState } from "react";
import { navigate, useLocation } from "@reach/router";
import { useIntl } from "react-intl";
import { Redux, Slices } from "spwa-ui-library";
import { selectDesktop } from "spwa-ui-library/esm/redux/store/appSlice";

import { KFCLoyaltyBannerClickGA } from "spwa-ui-library/esm/utils/helperGA";
import css from "./index.module.scss";
import LoyaltyPopup from "../LoyaltyPopup";
import EnrollError from "../EnrollError";
import SquareSkeleton from "./SquareSkeleton";
const { useSelector } = Redux;
const { selectLoginStatus } = Slices.authSlice;
const { loyaltyConfigSelector } = Slices.loyaltyAccountSlice;
const { getCurrentProfile } = Slices.profileSlice;

const UnlockRewardLink = () => {
  const { phnVerified } = useSelector(getCurrentProfile) || {};
  const location = useLocation();
  const intl = useIntl();
  const isLoggedIn = useSelector(selectLoginStatus);
  const loyaltyConfigData = useSelector(loyaltyConfigSelector);
  const isDesktop = useSelector(selectDesktop);
  const lang = intl.locale;

  const [isImageLoading, setIsImageLoading] = useState(true);

  const loyaltyAccount =
    loyaltyConfigData?.[lang]?.[
      isDesktop ? "homeWidgetMediaPwa" : "homeWidgetMedia"
    ];

  const [isPopUPOpen, setIsPopUPOpen] = useState(false);

  const handleClick = useCallback(
    (e) => {
      e && e.preventDefault();
      if (!phnVerified && isLoggedIn) {
        setIsPopUPOpen(true);
        return true;
      }
      if (isLoggedIn) {
        KFCLoyaltyBannerClickGA({
          eventCategory: "PWAHomePage",
          eventAction: "UnlockRewards",
          points: 0,
        });
        const oldLocation = {
          ...location,
          href: location.origin,
          pathname: `/${lang}/home`,
        };
        navigate(`/${lang}/rewards/introduction`, {
          replace: true,
          state: {
            oldLocation,
            isMobileDialog: true,
            mobileViewType: "drawer",
          },
        });
      } else {
        KFCLoyaltyBannerClickGA({
          eventCategory: "PWAHomePage",
          eventAction: "Login",
          points: 0,
        });
        navigate(`/${lang}/login`, {
          state: {
            oldLocation: JSON.parse(JSON.stringify(location)),
            retUrl: `/rewards/introduction`,
          },
        });
      }
    },
    [phnVerified, isLoggedIn, location, lang]
  );

  const handleImageLoad = () => {
    setIsImageLoading(false);
  };

  return (
    <>
      <a href="/" onClick={handleClick} className={css.unlockRewards}>
        {isImageLoading && (
          <div className={css.mainBox}>
            <SquareSkeleton />
          </div>
        )}
        {isLoggedIn ? (
          <img
            src={loyaltyAccount?.loggedIn}
            alt="LogIN"
            className={isImageLoading ? css.imgLoading : ""}
            onLoad={handleImageLoad}
          />
        ) : (
          <img
            src={loyaltyAccount?.nonLoggedIn}
            alt="JoinIN"
            className={isImageLoading ? css.imgLoading : ""}
            onLoad={handleImageLoad}
          />
        )}
      </a>

      <LoyaltyPopup
        open={isPopUPOpen}
        onClose={() => {
          setIsPopUPOpen(false);
        }}
      >
        <EnrollError
          type="NON_VERIFIED_PHONE_NUMBER"
          message={intl.formatMessage({ id: "verify_number" })}
          replaceOopsTitle={intl.formatMessage({ id: "verify_title" })}
          // onButtonClick={handleVerifyNumber}
        />
      </LoyaltyPopup>
    </>
  );
};

export default UnlockRewardLink;
