import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";
import AddCar from "v1/components/common/add-car";
import PostPurchaseCarForm from "./post";
import PopupMessage from "v1/hoc/PopupMessage";
import { routes } from "v1/client";
import CustomButton from "v1/components/common/custom-button";
import useLocale from "v1/hooks/useLocale";

const AddPurchaseCar = () => {
  const { i18n } = useLocale();
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [levels, setLevels] = useState({ count: 4, active: 1 });

  const handleNext = () => {
    if (levels.active === levels.count) {
      return setShowPopup(true);
    }

    setLevels({ ...levels, active: levels.active + 1 });
    scroll.scrollToTop();
  };

  const handlePrev = () => {
    if (levels.active === 1) return;
    setLevels({ ...levels, active: levels.active - 1 });
    scroll.scrollToTop();
  };

  const handleSelectLevel = (number) => {
    if (levels.active === number) return;
    setLevels({ ...levels, active: number });
    scroll.scrollToTop();
  };

  const handleBackToHome = () => {
    navigate(routes.home.navigate());
  };

  const handleViewPopup = () => {
    setShowPopup(true);
  };

  return (
    <>
      {showPopup && (
        <PopupMessage
          imageURL="/assets/images/arrow-right.svg"
          title={i18n("done")}
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
        onSelectLevel={handleSelectLevel}
      >
        <PostPurchaseCarForm
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

export default AddPurchaseCar;
