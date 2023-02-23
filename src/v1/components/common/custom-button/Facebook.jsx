import styled from "styled-components";

const Google = ({ title, onClick, ...props }) => {
  return (
    <Container onClick={onClick} {...props}>
      <Icon src="/assets/icons/social/facebook.svg" alt="Facebook logo" />
      <Title>{title || "Continue with facebook"}</Title>
    </Container>
  );
};

const Container = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 8px;
  width: 100%;
  height: 40px;
  border: none;
  outline: none;
  transition-duration: 176ms;
  cursor: pointer;

  :active {
    transform: scale(0.97);
  }
`;

const Icon = styled.img`
  width: 10px;
`;

const Title = styled.span`
  text-transform: capitalize;
  color: #0500ff;
  text-transform: capitalize;
  font-weight: 600;
  font-size: 14px;
`;

export default Google;
