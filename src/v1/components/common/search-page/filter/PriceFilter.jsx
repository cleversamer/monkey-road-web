import styled from "styled-components";
import CustomInput from "v1/components/common/custom-input";

const PriceFilter = ({ min, max, minValue, maxValue, onChange }) => {
  return (
    <Container>
      <CustomInput
        type="range"
        min={min}
        minValue={minValue}
        max={max}
        maxValue={maxValue}
        onChange={onChange}
      />
    </Container>
  );
};

const Container = styled.div`
  margin-top: 15px;
`;

export default PriceFilter;
