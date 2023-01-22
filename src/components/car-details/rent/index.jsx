import styled from "styled-components";
import CustomButton from "components/common/custom-button";

const RentCarDetails = ({ onRent }) => {
  return (
    <Container>
      <TitleContainer>
        <CarTitle>Title</CarTitle>

        <IconsContainer>
          <CustomButton type="like" />
          <CustomButton type="share" />
        </IconsContainer>
      </TitleContainer>

      <BreakLine />

      <DetailsList>
        <DetailsTitle>Price</DetailsTitle>

        <DetailsItem>
          <DetailsItemLeft>Daily price</DetailsItemLeft>
          <DetailsItemRight>100 AED</DetailsItemRight>
        </DetailsItem>

        <BreakLine />

        <DetailsItem>
          <DetailsItemLeft>Weekly price</DetailsItemLeft>
          <DetailsItemRight>100 AED</DetailsItemRight>
        </DetailsItem>

        <BreakLine />

        <DetailsItem>
          <DetailsItemLeft>Monthly price</DetailsItemLeft>
          <DetailsItemRight>100 AED</DetailsItemRight>
        </DetailsItem>

        <BreakLine />

        <DetailsItem>
          <DetailsItemLeft>Deposit</DetailsItemLeft>
          <DetailsItemRight>100 AED</DetailsItemRight>
        </DetailsItem>
      </DetailsList>

      <BreakLine />

      <DetailsList>
        <DetailsTitle>Description</DetailsTitle>

        <CarDescription>
          Lorem ipsum dolor sit amet consectetur. Enim dui consequat ut nunc
          sed. Laoreet integer egestas tristique at tempor ante donec turpis.
          Nibh odio sagittis auctor diam .
        </CarDescription>
      </DetailsList>

      <BreakLine />

      <DetailsList>
        <DetailsTitle>Details</DetailsTitle>

        <DetailsItem>
          <DetailsItemLeft>Left</DetailsItemLeft>
          <DetailsItemRight>Left</DetailsItemRight>
        </DetailsItem>

        <BreakLine />

        <DetailsItem>
          <DetailsItemLeft>Model</DetailsItemLeft>
          <DetailsItemRight>Toyota</DetailsItemRight>
        </DetailsItem>

        <BreakLine />

        <DetailsItem>
          <DetailsItemLeft>Year</DetailsItemLeft>
          <DetailsItemRight>2022</DetailsItemRight>
        </DetailsItem>

        <BreakLine />

        <DetailsItem>
          <DetailsItemLeft>Brand</DetailsItemLeft>
          <DetailsItemRight>Toyota</DetailsItemRight>
        </DetailsItem>

        <BreakLine />

        <DetailsItem>
          <DetailsItemLeft>Color</DetailsItemLeft>
          <DetailsItemRight>Black</DetailsItemRight>
        </DetailsItem>
      </DetailsList>

      <RentButtonContainer>
        <CustomButton type="primary" title="Rent now" onClick={onRent} />
      </RentButtonContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media screen and (max-width: 870px) {
    width: 100%;
    max-width: 550px;
    margin: 0 auto;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CarTitle = styled.h3`
  font-weight: 600;
  font-size: 28px;
  text-transform: capitalize;
`;

const IconsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  > svg {
    cursor: pointer;
    background-color: #fff;
    padding: 4px;
    box-sizing: content-box;
    border-radius: 50%;
  }
`;

const BreakLine = styled.span`
  display: inline-block;
  width: 100%;
  height: 0px;
  border: 1px solid #aaa;
`;

const DetailsList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const DetailsTitle = styled.h4`
  font-weight: 700;
  font-size: 18px;
  color: #000000;
`;

const DetailsItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DetailsItemLeft = styled.span`
  font-weight: 500;
  font-size: 15px;
  text-transform: capitalize;
  color: #000000;
`;

const DetailsItemRight = styled.span`
  font-weight: 400;
  font-size: 15px;
  color: #333333;
`;

const CarDescription = styled.p`
  font-weight: 400;
  font-size: 14px;
  line-height: 1.4;
  text-align: justify;
  color: #000000;
`;

const RentButtonContainer = styled.div`
  padding-top: 20px;
  width: 100%;
  max-width: 350px;
  margin: 0 auto;
`;

export default RentCarDetails;
