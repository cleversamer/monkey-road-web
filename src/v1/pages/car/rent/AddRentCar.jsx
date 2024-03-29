import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";
import AddCar from "v1/components/common/add-car";
import PostRentCarForm from "./post";
import PopupMessage from "v1/hoc/PopupMessage";
import CustomButton from "v1/components/common/custom-button";
import { routes } from "v1/client";
import useLocale from "v1/hooks/useLocale";

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

  const handleSelectLevel = (number) => {
    if (levels.active === number) return;
    setLevels({ ...levels, active: number });
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
        pageTitles={[i18n("home"), i18n("arrow"), i18n("postRentCar")]}
        noOfLevels={levels.count}
        activeLevel={levels.active}
        onSelectLevel={handleSelectLevel}
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
