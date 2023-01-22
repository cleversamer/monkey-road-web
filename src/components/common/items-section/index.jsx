import styled from "styled-components";
import Slider from "./Slider";
import { IoIosArrowForward } from "react-icons/io";

const ItemsSection = ({ type, title, onSeeMore, brands, children }) => {
  return (
    <Container>
      <TitleContainer>
        <Title>{title}</Title>
        {type === "section" && (
          <SeeMore onClick={onSeeMore}>
            See more <IoIosArrowForward />
          </SeeMore>
        )}
      </TitleContainer>

      <ItemsContainer type={type}>
        {type === "slider" ? (
          <Slider>{children}</Slider>
        ) : type === "section" ? (
          <ItemsList brands={brands}>{children}</ItemsList>
        ) : null}
      </ItemsContainer>
    </Container>
  );
};

const Container = styled.div`
  background-color: #fafafa;
  margin-top: ${({ type }) => (type === "slider" ? "50px" : "0")};
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

const TitleContainer = styled.div`
  width: 100%;
  margin-left: ${({ type }) => (type === "slider" ? "100px" : "0")};
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media screen and (max-width: 768px) {
    margin-left: ${({ type }) => (type === "slider" ? "10px" : "0")};
  }
`;

const Title = styled.h4`
  font-weight: 500;
  font-size: 20px;
  text-transform: capitalize;
  color: #000000;

  @media screen and (max-width: 480px) {
    font-size: 18px;
  }
`;

const SeeMore = styled.span`
  font-weight: 500;
  font-size: 16px;
  text-transform: capitalize;
  color: #fe7777;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2px;
  transition-duration: 176ms;

  > svg {
    fill: #fe7777;
    font-size: 18px;
    transition-duration: 176ms;
  }

  :hover {
    text-decoration: underline;

    > svg {
      transform: translateX(3px);
    }
  }

  :active {
    transform: scale(0.98);
  }

  @media screen and (max-width: 480px) {
    font-size: 15px;
  }
`;

const ItemsContainer = styled.div`
  .rec.rec-swipable {
    display: flex;
    align-items: center;
    gap: 20px;

    .sc-hpfkCd.dglUjS.rec.rec-item-wrapper {
      background-color: transparent;
    }
  }

  button.rec-arrow-right,
  button.rec-arrow-left {
    margin: 20px;

    @media screen and (max-width: 768px) {
      display: none;
    }
  }
`;

const ItemsList = styled.div`
  /* display: flex;
  align-items: center;
  gap: 20px; */

  display: grid;
  grid-template-columns: ${({ brands }) =>
    brands
      ? "repeat(auto-fit, minmax(150px, 1fr))"
      : "repeat(auto-fit, minmax(250px, 1fr))"};
  grid-gap: 20px;

  > * {
    margin: 0;
  }
`;

export default ItemsSection;
