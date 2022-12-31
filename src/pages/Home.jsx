import styled from "styled-components";
import Header from "components/header";
import AboutUs from "components/about-us";
import WhyUs from "components/why-us";
import ContactUs from "components/contact-us";
import Features from "components/features";

const Home = () => {
  return (
    <Container>
      <Header />
      <AboutUs />
      <WhyUs />
      <ContactUs />
      <Features />
    </Container>
  );
};

const Container = styled.div`
  overflow: hidden;
  background-color: #fafafa;
`;

export default Home;
