import styled from "styled-components";

const ContentWrapper = ({ children, ...props }) => {
  return <Content {...props}>{children}</Content>;
};

const Content = styled.div`
  max-width: 1280px;
  margin: 0 auto;
`;

export default ContentWrapper;
