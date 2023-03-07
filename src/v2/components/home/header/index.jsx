import styled from "styled-components";
import ContentWrapper from "v2/hoc/ContentWrapper";
import HeaderLeft from "./HeaderLeft";
import HeaderRight from "./HeaderRight";
import { FiMail } from "react-icons/fi";
import { BsWhatsapp } from "react-icons/bs";
import { IoCallSharp } from "react-icons/io5";
import { FaInstagram } from "react-icons/fa";
import useLocale from "v2/hooks/useLocale";

const Header = ({
  search,
  placeholder,
  onSubmit,
  onRentSelect,
  onSaleSelect,
  onSearchChange,
}) => {
  const { lang } = useLocale();

  return (
    <Container>
      <Content lang={lang}>
        <HeaderLeft
          onSubmit={onSubmit}
          placeholder={placeholder}
          search={search}
          onRentSelect={onRentSelect}
          onSaleSelect={onSaleSelect}
          onSearchChange={onSearchChange}
        />

        <HeaderRight />

        <SocialIcons>
          <SocialIcon>
            <SocialLink
              target="_blank"
              href="mailto:thedev.samer@gmail.com"
              color="#fe7777"
            >
              <FiMail />
            </SocialLink>
          </SocialIcon>

          <SocialIcon>
            <SocialLink target="_blank" href="https://wa.me/+971585641444">
              <BsWhatsapp />
            </SocialLink>
          </SocialIcon>

          <SocialIcon>
            <SocialLink target="_blank" href="tel:+971585641444">
              <IoCallSharp />
            </SocialLink>
          </SocialIcon>

          <SocialIcon>
            <SocialLink
              target="_blank"
              href="https://instagram.com/cleversamer_"
            >
              <FaInstagram />
            </SocialLink>
          </SocialIcon>
        </SocialIcons>
      </Content>

      <Clip
        src="/assets/images/header/background.png"
        alt="clip image for styling"
      />

      <Car src="/assets/images/header/car.svg" alt="a red car" />
    </Container>
  );
};

const Container = styled.header`
  overflow: hidden;
  margin-bottom: 100px;
  position: relative;
`;

const Content = styled(ContentWrapper)`
  padding: 70px;
  padding-bottom: 100px;
  max-width: 1366px;
  display: flex;
  flex-direction: ${({ lang }) => (lang === "en" ? "row" : "row-reverse")};
  justify-content: space-between;
  background-color: #333;
  position: relative;

  @media screen and (max-width: 820px) {
    flex-direction: column;
  }

  @media screen and (max-width: 540px) {
    padding-left: 30px;
    padding-right: 30px;
  }

  @media screen and (max-width: 480px) {
    padding-bottom: 0;
  }
`;

const Clip = styled.img`
  display: block;
  max-width: 1366px;
  margin: 0 auto;
  border-bottom-left-radius: 50px;
  border-bottom-right-radius: 50px;

  @media screen and (max-width: 480px) {
    margin-top: -45px;
  }
`;

const Car = styled.img`
  position: absolute;
  left: 50%;
  bottom: -130px;
  transform: translate(-50%, -50%);
  display: block;
  margin: 0 auto;
  width: 90vw;
  max-width: 600px;

  @media screen and (max-width: 480px) {
    bottom: -100px;
  }
`;

const SocialIcons = styled.ul`
  position: absolute;
  top: 50%;
  left: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding-left: 15px;
`;

const SocialIcon = styled.li`
  transition-duration: 176ms;

  :hover {
    transform: scale(1.15);

    svg {
      fill: #fe7777;
    }
  }

  :active {
    transform: scale(1);
  }
`;

const SocialLink = styled.a`
  svg {
    fill: ${({ color }) => (color ? color : "#fff")};
    font-size: 18px;
  }
`;

export default Header;
