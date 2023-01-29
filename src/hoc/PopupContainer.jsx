import styled from "styled-components";

const PopupContainer = ({ children }) => {
  const body = document.body;
  const html = document.documentElement;

  const height = Math.max(
    body.scrollHeight,
    body.offsetHeight,
    html.clientHeight,
    html.scrollHeight,
    html.offsetHeight
  );

  return (
    <Container height={height}>
      <Content>{children}</Content>
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100vw;
  max-width: 1366px;
  margin: 0 auto;
  height: ${({ height }) => `${height}px`};
  z-index: 99999999999999999999;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Content = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default PopupContainer;
