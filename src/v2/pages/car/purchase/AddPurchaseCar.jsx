import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";
import AddCar from "v2/components/common/add-car";
import PostPurchaseCarForm from "./post";
import PopupMessage from "v2/hoc/PopupMessage";
import { routes } from "v2/client";
import CustomButton from "v2/components/common/custom-button";
import useLocale from "v2/hooks/useLocale";

const AddPurchaseCar = () => {
  const { i18n } = useLocale();
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [levels, setLevels] = useState([
    { title: "carInfo", active: true },
    { title: "enterPrice", active: false },
    { title: "uploadsImages", active: false },
    { title: "payment", active: false },
  ]);

  const handleNext = () => {
    if (levels[levels.length - 1].active) return;
    const newIndex = levels.findIndex((level) => level.active) + 1;
    const newLevels = levels.map((level, index) => ({
      ...level,
      active: index === newIndex,
    }));
    setLevels(newLevels);
    scroll.scrollToTop();
  };

  const handlePrev = () => {
    if (levels[0].active) return;
    const newIndex = levels.findIndex((level) => level.active) - 1;
    const newLevels = levels.map((level, index) => ({
      ...level,
      active: index === newIndex,
    }));
    setLevels(newLevels);
    scroll.scrollToTop();
  };

  const handleSelectLevel = (levelIndex) => {
    const newLevels = levels.map((level, index) => ({
      ...level,
      active: index === levelIndex,
    }));
    setLevels(newLevels);
    scroll.scrollToTop();
  };

  const getActiveLevel = () => {
    const index = levels.findIndex((level) => level.active);
    return index + 1;
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
        levels={levels}
        onSelectLevel={handleSelectLevel}
        activeLevel={getActiveLevel()}
      >
        <PostPurchaseCarForm
          onNext={handleNext}
          onPrev={handlePrev}
          onViewPopup={handleViewPopup}
          activeLevel={getActiveLevel()}
          noOfLevels={levels.length}
        />
      </AddCar>
    </>
  );
};

export default AddPurchaseCar;
