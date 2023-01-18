import { useState } from "react";
import styled from "styled-components";
import ViewMore from "./ViewMore";

const ColorsFilter = ({ onChange }) => {
  const [colors, setColors] = useState([
    { _id: 1, title: "Red", hex: "red", selected: false },
    { _id: 2, title: "Blue", hex: "blue", selected: false },
    { _id: 3, title: "Black", hex: "black", selected: false },
    { _id: 4, title: "Purple", hex: "purple", selected: false },
    { _id: 5, title: "Yellow", hex: "yellow", selected: false },
    { _id: 6, title: "Green", hex: "green", selected: false },
  ]);

  const handleViewMore = () => {};

  const handleSelect = (color) => {
    const colorsList = [...colors];
    const colorIndex = colorsList.findIndex((item) => item._id === color._id);
    colorsList[colorIndex].selected = !colorsList[colorIndex].selected;
    setColors(colorsList);

    const selectedColors = colors.filter((item) => item.selected);
    onChange(selectedColors);
  };

  return (
    <Container>
      <List>
        {colors.map((color) => (
          <Color key={color._id} onClick={() => handleSelect(color)}>
            <ColorCircle selected={color.selected} color={color.hex} />
            <ColorTitle selected={color.selected}>{color.title}</ColorTitle>
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
  border: ${({ selected }) => (selected ? "4px solid #ccc" : "")};
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
