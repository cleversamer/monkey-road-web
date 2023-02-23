import styled from "styled-components";

const Button = ({ color, title = "", onClick, ...props }) => {
  return (
    <Container color={color} onClick={onClick} {...props}>
      {title}
    </Container>
  );
};

const Container = styled.button`
  background-color: ${({ color }) => (color ? color : "#fe7777")};
  border-radius: 8px;
  color: #fff;
  text-transform: capitalize;
  width: 100%;
  height: 40px;
  border: none;
  outline: none;
  transition-duration: 176ms;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;

  :active {
    transform: scale(0.97);
  }
`;

export default Button;
