import { useCallback, useEffect, useState } from "react";
import { Redux, Slices } from "spwa-ui-library";
import PointBalanceCard from "../PointBalanceCard";
import UserReward from "../UserReward";
import EnrollError from "../EnrollError";
import LoyaltyPopup from "../LoyaltyPopup";
import { selectDesktop } from "spwa-ui-library/esm/redux/store/appSlice";
import {
  enrolmentErrorAlertViewGA,
  KFCLoyaltyBannerViewGA,
} from "spwa-ui-library/esm/utils/helperGA";
import { navigate } from "@reach/router";
import { useIntl } from "react-intl";

const { useSelector, useDispatch } = Redux;
const { loyaltyAuthSelector } = Slices.loyaltyAuthSlice;
const { registerMemberSelector, clearRegisterMember } =
  Slices.loyaltyMemberSlice;

const LoyaltyWidget = () => {
  const intl = useIntl();
  const lang = intl.locale;
  const dispatch = useDispatch();
  const isDesktop = useSelector(selectDesktop);
  const authData = useSelector(loyaltyAuthSelector);
  const registerMemberState = useSelector(registerMemberSelector);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const isEnrolled = authData?.isLoyaltyMember;
  const isStoreEnabled = authData?.isStoreEnabled;
  const isValidCountry = authData?.isValidCountry;
  const registerMemberApiStatus = registerMemberState.status;

  const handlePopupClose = useCallback(() => {
    dispatch(clearRegisterMember());
    setIsPopupOpen(false);
  }, [dispatch]);

  useEffect(() => {
    const evAction =
      isStoreEnabled && !isEnrolled
        ? "UnlockRewards"
        : isStoreEnabled && isEnrolled
        ? "ViewRewards"
        : "RedeemNow";

    const timeOutObj = setTimeout(() => {
      KFCLoyaltyBannerViewGA({
        eventCategory: "PWAHomePage",
        eventAction: evAction,
        points: 0,
      });
    }, 3000);

    return () => {
      clearTimeout(timeOutObj);
    };
  }, [isEnrolled, isStoreEnabled]);

  useEffect(() => {
    if (registerMemberApiStatus === "failed") {
      navigate(`/${lang}/home`);
      setIsPopupOpen(true);
      enrolmentErrorAlertViewGA({
        eventLabel: "ViewEnrolmentErrorAlertForBlockedUser",
      });
    } else {
      setIsPopupOpen(false);
    }
  }, [isDesktop, lang, registerMemberApiStatus]);

  if (!isValidCountry) {
    return <></>;
  }

  return (
    <>
      {isStoreEnabled && !isEnrolled && <UserReward isEnrolled={isEnrolled} />}
      {isEnrolled && isStoreEnabled && <PointBalanceCard />}

      <LoyaltyPopup open={isPopupOpen} onClose={handlePopupClose}>
        {registerMemberApiStatus === "failed" && registerMemberState.error && (
          <EnrollError onButtonClick={handlePopupClose} />
        )}
      </LoyaltyPopup>
    </>
  );
};

export default LoyaltyWidget;
