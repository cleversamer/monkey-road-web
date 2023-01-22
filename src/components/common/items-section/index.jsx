import styled from "styled-components";
import Slider from "./Slider";

const ItemsSection = ({ type, title = "", children }) => {
  return (
    <Container>
      <TitleContainer>
        <Title>{title}</Title>
      </TitleContainer>

      <ItemsContainer>
        {type === "slider" ? (
          <Slider>{children}</Slider>
        ) : type === "section" ? (
          <ItemsList>{children}</ItemsList>
        ) : null}
      </ItemsContainer>
    </Container>
  );
};

const Container = styled.div`
  background-color: #fafafa;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

const TitleContainer = styled.div`
  width: 100%;
  margin-left: 100px;

  @media screen and (max-width: 768px) {
    margin-left: 10px;
  }
`;

const Title = styled.h4`
  font-weight: 500;
  font-size: 20px;
  text-transform: capitalize;
  color: #000000;
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

const ItemsList = styled.div``;

export default ItemsSection;
