import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";
import AddCar from "components/common/add-car";
import PostRentCarForm from "./post";
import PopupMessage from "hoc/PopupMessage";
import CustomButton from "components/common/custom-button";
import { routes } from "client";
import useLocale from "hooks/useLocale";

const AddRentCar = () => {
  const { i18n } = useLocale();
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [levels, setLevels] = useState({ count: 3, active: 1 });

  const handleNext = () => {
    if (levels.active === levels.count) return;
    setLevels({ ...levels, active: levels.active + 1 });
    scroll.scrollToTop();
  };

  const handlePrev = () => {
    if (levels.active === 1) return;
    setLevels({ ...levels, active: levels.active - 1 });
    scroll.scrollToTop();
  };

  const handleViewPopup = () => {
    setShowPopup(true);
  };

  const handleBackToHome = () => {
    navigate(routes.home.navigate());
  };

  return (
    <>
      {showPopup && (
        <PopupMessage
          imageURL="/assets/images/arrow-right.svg"
          title={i18n("waitingForApproval")}
          subtitle={i18n("operationSucceeded")}
          onHide={() => setShowPopup(false)}
        >
          <CustomButton
            type="primary"
            title={i18n("backToHome")}
            onClick={handleBackToHome}
          />
        </PopupMessage>
      )}

      <AddCar
        pageTitles={[i18n("home"), i18n("arrow"), i18n("postPurchaseCar")]}
        noOfLevels={levels.count}
        activeLevel={levels.active}
      >
        <PostRentCarForm
          onNext={handleNext}
          onPrev={handlePrev}
          onViewPopup={handleViewPopup}
          activeLevel={levels.active}
          noOfLevels={levels.count}
        />
      </AddCar>
    </>
  );
};

export default AddRentCar;
