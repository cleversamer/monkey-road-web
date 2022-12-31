import styled from "styled-components";
import Header from "components/header";
import AboutUs from "components/about-us";
import WhyUs from "components/why-us";
import ContactUs from "components/contact-us";

const Home = () => {
  return (
    <Container>
      <Header />
      <AboutUs />
      <WhyUs />
      <ContactUs />
    </Container>
  );
};

const Container = styled.div`
  overflow: hidden;
  background-color: #fafafa;
`;

export default Home;
