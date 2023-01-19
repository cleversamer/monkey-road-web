import styled from "styled-components";
import { AiOutlineClockCircle } from "react-icons/ai";

const RightSide = () => {
  return (
    <Container>
      <Grid>
        <GridItem>
          <TopLine>
            <AiOutlineClockCircle />
            <Title>Always available</Title>
          </TopLine>

          <Paragraph>
            Lorem ipsum dolor sit amet consectetur. Arcu pellentesque sit in
            nisi nunc justo vel nascetur
          </Paragraph>
        </GridItem>

        <GridItem>
          <TopLine>
            <AiOutlineClockCircle />
            <Title>Always available</Title>
          </TopLine>

          <Paragraph>
            Lorem ipsum dolor sit amet consectetur. Arcu pellentesque sit in
            nisi nunc justo vel nascetur
          </Paragraph>
        </GridItem>

        <GridItem>
          <TopLine>
            <AiOutlineClockCircle />
            <Title>Always available</Title>
          </TopLine>

          <Paragraph>
            Lorem ipsum dolor sit amet consectetur. Arcu pellentesque sit in
            nisi nunc justo vel nascetur
          </Paragraph>
        </GridItem>

        <GridItem>
          <TopLine>
            <AiOutlineClockCircle />
            <Title>Always available</Title>
          </TopLine>

          <Paragraph>
            Lorem ipsum dolor sit amet consectetur. Arcu pellentesque sit in
            nisi nunc justo vel nascetur
          </Paragraph>
        </GridItem>
      </Grid>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Grid = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 25px;

  @media screen and (max-width: 1080px) {
    width: 100%;
    padding: 20px;
    gap: 40px;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
`;

const GridItem = styled.li`
  background-color: #fafafa;
  box-shadow: 0px 1px 3px 3px rgba(254, 119, 119, 0.35);
  border-radius: 8px;
  width: 100%;
  max-width: 200px;
  height: 150px;
  padding: 10px;
  box-sizing: content-box;
  margin: 0 auto;
`;

const TopLine = styled.span`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 7px;
  margin-bottom: 10px;

  svg {
    fill: #fe7777;
    font-size: 18px;
  }
`;

const Title = styled.h5`
  color: #fe7777;
  font-size: 18px;
  font-weight: 600;
`;

const Paragraph = styled.p`
  line-height: 25px;
  font-size: 14px;
  font-weight: 400;
  text-transform: capitalize;

  @media screen and (max-width: 1080px) {
    font-size: 13px;
  }
`;

export default RightSide;
