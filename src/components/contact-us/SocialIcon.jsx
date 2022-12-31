import styled from "styled-components";

const SocialIcon = ({ iconPath, title, color, ...props }) => {
  return (
    <Container color={color} {...props}>
      <SocialIconImage src={iconPath} alt={title} />
      <SocialIconTitle>{title}</SocialIconTitle>
    </Container>
  );
};

const Container = styled.li`
  width: 200px;
  height: 40px;
  background-color: ${({ color }) => color};
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 8px;
  cursor: pointer;
  transition-duration: 176ms;

  :active {
    transform: scale(0.98);
  }
`;

const SocialIconImage = styled.img`
  width: 18px;
`;

const SocialIconTitle = styled.span`
  color: #fff;
  font-size: 14px;
  font-weight: 500;
`;

export default SocialIcon;
