import styled from "styled-components";
import Header from "components/home/header";
import PopularBrands from "components/home/popular-brands";
import AboutUs from "components/home/about-us";
import WhyUs from "components/home/why-us";
import Features from "components/home/features";

const Home = () => {
  return (
    <Container>
      <Header />
      <PopularBrands />
      <WhyUs />
      <AboutUs />
      <Features />
    </Container>
  );
};

const Container = styled.div`
  overflow: hidden;
  background-color: #fff;
`;

export default Home;
