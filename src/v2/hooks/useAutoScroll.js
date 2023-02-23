import { useEffect } from "react";
import { animateScroll as scroll } from "react-scroll";

const useAutoScroll = () => {
  useEffect(() => {
    scroll.scrollToTop();
  }, []);
};

export default useAutoScroll;
