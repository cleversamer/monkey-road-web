import { useState, useEffect } from "react";

const useTimer = (timeInSeconds) => {
  const [seconds, setSeconds] = useState(parseInt(timeInSeconds));

  useEffect(() => {
    if (!seconds) return;

    const interval = setInterval(() => {
      setSeconds(seconds - 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds]);

  const reset = () => {
    setSeconds(parseInt(timeInSeconds));
  };

  return { seconds, reset };
};

export default useTimer;
