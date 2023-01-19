import { Link } from "react-router-dom";
import styled from "styled-components";
import { animateScroll as scroll } from "react-scroll";
import {
  FaFacebookF,
  FaPinterestP,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import { ROUTES } from "client";

const Footer = () => {
  return (
    <Container>
      <ColumnsList>
        <ColumnItem>
          <ColumnTitle>Website</ColumnTitle>
          <ColumnRoute
            to={ROUTES.CLIENT.HOME}
            onClick={() => scroll.scrollToTop()}
          >
            Home
          </ColumnRoute>

          <ColumnRoute to={ROUTES.CLIENT.RENT_CARS}>Cars for rent</ColumnRoute>

          <ColumnRoute to={ROUTES.CLIENT.PURCHASE_CARS}>
            Cars for sale
          </ColumnRoute>
        </ColumnItem>

        <ColumnItem>
          <ColumnTitle>About</ColumnTitle>
          <ColumnRoute to="">About us</ColumnRoute>
          <ColumnRoute to="">FAQ</ColumnRoute>
          <ColumnRoute to="">Privacy policy</ColumnRoute>
          <ColumnRoute to="">Terms of condition</ColumnRoute>
        </ColumnItem>

        <ColumnItem>
          <ColumnTitle>App</ColumnTitle>

          <ColumnLink target="_blank" href="https://play.google.com">
            <StoreImage
              src="/assets/icons/footer/app-store.svg"
              alt="app store"
            />
          </ColumnLink>

          <ColumnLink target="_blank" href="https://play.google.com">
            <StoreImage
              src="/assets/icons/footer/play-store.svg"
              alt="play store"
            />
          </ColumnLink>
        </ColumnItem>
      </ColumnsList>

      <Newsletter>
        <Title>Our newsletter</Title>
        <Subtitle>Subscribe to receive all new</Subtitle>
        <InputContainer>
          <Input type="email" required placeholder="Enter your email" />
          <Button>Subscribe</Button>
        </InputContainer>

        <SocialContainer>
          <SocialTitle>Follow us</SocialTitle>
          <SocialIcons>
            <SocialIcon>
              <SocialLink color="#fe7777">
                <FaFacebookF />
              </SocialLink>
            </SocialIcon>

            <SocialIcon>
              <SocialLink>
                <FaPinterestP />
              </SocialLink>
            </SocialIcon>

            <SocialIcon>
              <SocialLink>
                <FaTwitter />
              </SocialLink>
            </SocialIcon>

            <SocialIcon>
              <SocialLink>
                <FaInstagram />
              </SocialLink>
            </SocialIcon>

            <SocialIcon>
              <SocialLink>
                <FaLinkedinIn />
              </SocialLink>
            </SocialIcon>
          </SocialIcons>
        </SocialContainer>
      </Newsletter>
    </Container>
  );
};

const Container = styled.footer`
  background-color: #222;
  height: 230px;
  width: 100vw;
  max-width: 1366px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 70px;
`;

const ColumnsList = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

const ColumnItem = styled.li`
  display: flex;
  flex-direction: column;
  gap: 10px;
  color: #fff;
  width: 250px;
`;

const ColumnTitle = styled.h6`
  color: #fff;
  font-size: 20px;
  font-weight: 600;
`;

const ColumnRoute = styled(Link)`
  font-size: 15px;
  width: fit-content;
  text-transform: capitalize;
  transition-duration: 176ms;

  :hover {
    color: #fe7777;
  }
`;

const ColumnLink = styled.a`
  font-size: 15px;
  width: fit-content;
  text-transform: capitalize;
  transition-duration: 176ms;

  :hover {
    color: #fe7777;
  }
`;

const StoreImage = styled.img`
  width: 100px;
`;

const Newsletter = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Title = styled.h6`
  color: #fff;
  text-transform: capitalize;
  font-size: 18px;
  font-weight: 600;
`;

const Subtitle = styled.p`
  color: #fff;
  text-transform: capitalize;
  font-size: 14px;
  font-weight: 500;
`;

const InputContainer = styled.div`
  display: flex;
`;

const Input = styled.input`
  outline: none;
  border: none;
  padding: 10px;
  background: #555;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  width: 250px;
  height: 35px;
  color: #fff;

  ::placeholder {
    color: #888;
    font-size: 14px;
    font-weight: 400;
    text-transform: capitalize;
  }
`;

const Button = styled.button`
  outline: none;
  border: none;
  padding: 5px;
  background: #fe7777;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  width: 120px;
  height: 35px;
  color: #fff;
  cursor: pointer;
  font-weight: 500;
  font-size: 15px;
  text-transform: uppercase;
  transition-duration: 176ms;

  :active {
    transform: translateX(-2px) scale(0.96);
  }
`;

const SocialContainer = styled.div`
  margin-top: 5px;
`;

const SocialTitle = styled.h6`
  font-size: 15px;
  font-weight: 600;
  color: #fff;
  text-transform: capitalize;
  margin-bottom: 10px;
`;

const SocialIcons = styled.ul`
  list-style: none;
  display: flex;
  align-items: center;
  gap: 7px;
`;

const SocialIcon = styled.li`
  transition-duration: 176ms;

  :hover {
    transform: scale(1.15);

    svg {
      fill: #fe7777;
      color: #fe7777;
    }
  }

  :active {
    transform: scale(1);
  }
`;

const SocialLink = styled.a`
  svg {
    font-size: 18px;
    fill: ${({ color }) => (color ? color : "#fff")};

    :hover {
      fill: "#fe7777" !important;
    }
  }
`;

export default Footer;
