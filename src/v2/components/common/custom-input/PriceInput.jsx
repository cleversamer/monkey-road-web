import styled from "styled-components";

const PriceInput = ({ value }) => {
  return (
    <Container>
      <Input type="text" disabled value={value} />
      <Currency>AED</Currency>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  height: 35px;
  border: none;
  outline: none;
  border-radius: 6px;
  padding: 0 15px;
  background-color: ${({ disabled }) => (disabled ? "#EBEBEB" : "#fff")};
  border-radius: 8px;
`;

const Currency = styled.span`
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 500;
  color: gray;
`;

export default PriceInput;
