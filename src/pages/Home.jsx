import styled from "styled-components";
import Header from "components/header";
import AboutUs from "components/about-us";
import WhyUs from "components/why-us";

const Home = () => {
  return (
    <Container>
      <Header />
      <AboutUs />
      <WhyUs />
    </Container>
  );
};

const Container = styled.div`
  overflow: hidden;
  background-color: #fafafa;
`;

export default Home;
