import { useState } from "react";
import styled from "styled-components";
import useLocale from "hooks/useLocale";

const RangeInput = ({ min, max, minValue, maxValue, onChange }) => {
  const { i18n, lang } = useLocale();
  const [style, setStyle] = useState({
    left: `${(min / maxValue) * 100}%`,
    right: `${100 - (max / maxValue) * 100}%`,
  });

  const handleChange = (key) => (e) => {
    onChange(key)(e);

    setStyle({
      left: `${(min / maxValue) * 100}%`,
      right: `${100 - (max / maxValue) * 100}%`,
    });
  };

  const filterPrice = (price) => {
    if (price < 1000) return price;

    let thousands = Math.floor(price / 1000);
    return `${thousands}K`;
  };

  return (
    <PriceInput>
      <TopRow>
        <Slider>
          <Progress left={style.left} right={style.right} />
        </Slider>

        <InputContainer>
          <InputMin
            type="range"
            min={minValue}
            max={maxValue}
            value={min}
            onChange={handleChange("min")}
          />

          <InputMax
            type="range"
            min={minValue}
            max={maxValue}
            value={max}
            onChange={handleChange("max")}
          />
        </InputContainer>
      </TopRow>

      <BottomRow>
        <Price>
          {filterPrice(min)} {i18n("aed")}
        </Price>
        <Price>
          {filterPrice(max)} {i18n("aed")}
        </Price>
      </BottomRow>
    </PriceInput>
  );
};

const PriceInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-align: left;
`;

const TopRow = styled.div``;

const Slider = styled.div`
  width: 100%;
  height: 5px;
  border-radius: 5px;
  background-color: #ddd;
  position: relative;
`;

const Progress = styled.div`
  height: 5px;
  background-color: #fe7777;
  border-radius: 5px;
  position: absolute;
  left: ${({ left }) => (left ? left : "25%")};
  right: ${({ right }) => (right ? right : "25%")};
`;

const InputContainer = styled.div`
  position: relative;
`;

const Input = styled.input`
  position: absolute;
  top: -5px;
  height: 5px;
  width: 100%;
  background: none;
  -webkit-appearance: none;
  pointer-events: none;
  cursor: pointer;

  ::-webkit-slider-thumb {
    height: 17px;
    width: 17px;
    border-radius: 50%;
    pointer-events: auto;
    -webkit-appearance: none;
    background-color: #fe7777;
  }

  ::-moz-range-thumb {
    height: 17px;
    width: 17px;
    border: none;
    border-radius: 50%;
    pointer-events: auto;
    -moz-appearance: none;
    background-color: #fe7777;
  }
`;

const InputMin = styled(Input)``;

const InputMax = styled(Input)``;

const BottomRow = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Price = styled.span`
  font-size: 13px;
  font-weight: 500;
`;

export default RangeInput;
