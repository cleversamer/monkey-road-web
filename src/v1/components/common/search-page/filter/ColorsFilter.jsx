import { useState } from "react";
import styled from "styled-components";
import ViewMore from "./ViewMore";
import carsData from "v1/static/carsData";
import useLocale from "v1/hooks/useLocale";

const ColorsFilter = ({ selectedColors, onChange }) => {
  const { lang } = useLocale();
  const [colors, setColors] = useState(
    carsData.colors.map((item) => ({ ...item, selected: false }))
  );

  const handleViewMore = () => {};

  const handleSelect = (colorIndex) => {
    const colorsList = [...colors];
    colorsList[colorIndex].selected = !colorsList[colorIndex].selected;
    setColors(colorsList);

    const selectedColors = colors.filter((item) => item.selected);
    onChange(selectedColors);
  };

  const checkColorSelected = (color) => {
    const index = selectedColors.findIndex((c) => c.en === color.en);
    return index >= 0;
  };

  return (
    <Container>
      <List>
        {colors.map((color, index) => (
          <Color key={color.en} onClick={() => handleSelect(index)}>
            <ColorCircle
              selected={checkColorSelected(color)}
              color={color.en}
            />

            <ColorTitle selected={checkColorSelected(color)}>
              {color[lang]}
            </ColorTitle>
          </Color>
        ))}
      </List>

      <ViewMore onClick={handleViewMore} />
    </Container>
  );
};

const Container = styled.div``;

const List = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 20px 0;
  grid-gap: 20px;
`;

const Color = styled.li`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 7px;
`;

const ColorCircle = styled.span`
  background-color: ${({ color }) => color};
  display: inline-block;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  transition-duration: 100ms;
  border: 1px solid #fe7777;
  border: ${({ selected }) => (selected ? "4px solid #fe7777" : "")};
  cursor: pointer;

  :hover {
    transform: scale(1.03);
  }

  :active {
    transform: scale(0.97);
  }
`;

const ColorTitle = styled.h5`
  font-size: 14px;
  font-weight: 600;
  text-align: center;
  color: ${({ selected }) => (selected ? "#fe7777" : "#000")};
`;

export default ColorsFilter;
