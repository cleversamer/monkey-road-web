import styled from "styled-components";
import { MdDone } from "react-icons/md";

const Success = () => {
  return (
    <Container>
      <MdDone />
    </Container>
  );
};

const Container = styled.div`
  background-color: #fe7777;
  margin: 10px auto;
  padding: 10px;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  vertical-align: center;

  svg {
    fill: #fff;
    font-size: 20px;
  }
`;

export default Success;
