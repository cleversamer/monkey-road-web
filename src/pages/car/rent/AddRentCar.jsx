import { useState } from "react";
import { animateScroll as scroll } from "react-scroll";
import AddCar from "components/common/add-car";
import PostRentCarForm from "./post";

const AddRentCar = () => {
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

  return (
    <AddCar
      pageTitles={["home", ">", "post car for rent"]}
      noOfLevels={levels.count}
      activeLevel={levels.active}
    >
      <PostRentCarForm
        onNext={handleNext}
        onPrev={handlePrev}
        activeLevel={levels.active}
      />
    </AddCar>
  );
};

export default AddRentCar;
