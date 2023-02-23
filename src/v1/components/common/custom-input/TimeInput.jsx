import styled from "styled-components";

const TimeInput = ({ onChange }) => {
  return <Container type="time" onChange={onChange} />;
};

const Container = styled.input`
  width: 100%;
  height: 35px;
  border: none;
  outline: none;
  border-radius: 6px;
  padding-left: 40px;
  padding-right: 10px;
  background-color: #fafafa;
  border: 1px solid #fe7777;
  font-family: inherit;
  font-size: 14px;
  padding-left: 10px;

  ::-webkit-calendar-picker-indicator {
    font-size: 20px;
  }
`;

export default TimeInput;
