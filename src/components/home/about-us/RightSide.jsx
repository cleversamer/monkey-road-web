import styled from "styled-components";
import { AiOutlineClockCircle } from "react-icons/ai";
import useLocale from "hooks/useLocale";
import GridItem from "./GridItem";

const RightSide = () => {
  const { i18n } = useLocale();

  return (
    <Container>
      <Grid>
        <GridItem
          Icon={() => <AiOutlineClockCircle />}
          title={i18n("aboutUs1Title")}
          paragraph={i18n("aboutUs1Paragraph")}
        />

        <GridItem
          Icon={() => <AiOutlineClockCircle />}
          title={i18n("aboutUs1Title")}
          paragraph={i18n("aboutUs1Paragraph")}
        />

        <GridItem
          Icon={() => <AiOutlineClockCircle />}
          title={i18n("aboutUs1Title")}
          paragraph={i18n("aboutUs1Paragraph")}
        />

        <GridItem
          Icon={() => <AiOutlineClockCircle />}
          title={i18n("aboutUs1Title")}
          paragraph={i18n("aboutUs1Paragraph")}
        />
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

export default RightSide;
