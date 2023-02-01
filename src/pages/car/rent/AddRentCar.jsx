import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";
import AddCar from "components/common/add-car";
import PostRentCarForm from "./post";
import PopupMessage from "hoc/PopupMessage";
import CustomButton from "components/common/custom-button";
import { routes } from "client";

const AddRentCar = () => {
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);
  const [levels, setLevels] = useState({ count: 3, active: 1 });

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
          title="Send order"
          subtitle="operation accomplished successfully"
          onHide={() => setShowPopup(false)}
        >
          <CustomButton
            type="primary"
            title="Back to home"
            onClick={handleBackToHome}
          />
        </PopupMessage>
      )}

      <AddCar
        pageTitles={["home", ">", "post car for rent"]}
        noOfLevels={levels.count}
        activeLevel={levels.active}
      >
        <PostRentCarForm
          onNext={handleNext}
          onPrev={handlePrev}
          activeLevel={levels.active}
          noOfLevels={levels.count}
        />
      </AddCar>
    </>
  );
};

export default AddRentCar;
