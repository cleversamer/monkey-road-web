import styled from "styled-components";
import useTimer from "hooks/useTimer";
import parseSeconds from "utils/parseSeconds";

const Timer = ({ seconds, onClick }) => {
  const { seconds: remainingSeconds, reset } = useTimer(seconds);

  const mapRemainingTime = () => {
    const { mins, secs } = parseSeconds(remainingSeconds);
    const strMins = mins < 10 ? `0${mins}` : mins;
    const strSecs = secs < 10 ? `0${secs}` : secs;
    return `${strMins}:${strSecs}`;
  };

  const handleResend = () => {
    reset();
    onClick();
  };

  return (
    <Container active={!remainingSeconds}>
      {remainingSeconds ? (
        <span>Resend after {mapRemainingTime()}</span>
      ) : (
        <span onClick={handleResend}>Resend code</span>
      )}
    </Container>
  );
};

const Container = styled.span`
  text-align: center;
  text-decoration: ${({ active }) => (active ? "underline" : "normal")};
  color: ${({ active }) => (active ? "#fe7777" : "#000")};
  cursor: ${({ active }) => (active ? "pointer" : "auto")};
  font-size: 15px;
  font-weight: 600;
  transition-duration: 176ms;

  span {
    color: inherit;
  }
`;

export default Timer;
