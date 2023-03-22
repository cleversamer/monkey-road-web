import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";
import AddCar from "v2/components/common/add-car";
import PostRentCarForm from "./post";
import PopupMessage from "v2/hoc/PopupMessage";
import CustomButton from "v2/components/common/custom-button";
import { routes } from "v2/client";
import useLocale from "v2/hooks/useLocale";

const AddRentCar = () => {
  const { i18n } = useLocale();
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [levels, setLevels] = useState([
    { title: "carInfo", active: true },
    { title: "enterPrice", active: false },
    { title: "uploadsImages", active: false },
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

  const handleViewPopup = () => setShowPopup(true);

  const handleViewMyCars = () => navigate(routes.rentalPosts.navigate());

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
            title={i18n("viewMyCars")}
            onClick={handleViewMyCars}
          />
        </PopupMessage>
      )}

      <AddCar
        pageTitles={[i18n("home"), i18n("arrow"), i18n("postRentCar")]}
        levels={levels}
        onSelectLevel={handleSelectLevel}
        activeLevel={getActiveLevel()}
      >
        <PostRentCarForm
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

export default AddRentCar;
