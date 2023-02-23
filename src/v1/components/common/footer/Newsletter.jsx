import { useState } from "react";
import styled from "styled-components";
import {
  FaFacebookF,
  FaPinterestP,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import useLocale from "v1/hooks/useLocale";

const Newsletter = () => {
  const { i18n, lang } = useLocale();
  const [context, setContext] = useState({ email: "", submitted: false });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!context.email) return;

    setContext({ email: "", submitted: true });

    setTimeout(() => {
      setContext({ email: "", submitted: false });
    }, 4000);
  };

  const handleEmailChange = (e) =>
    setContext({ ...context, email: e.target.value });

  return (
    <Container lang={lang}>
      <Title>{i18n("newsletterTitle")}</Title>
      <Subtitle>{i18n("newsletterSubtitle")}</Subtitle>

      <InputContainer onSubmit={handleSubmit}>
        <Input
          disabled={context.submitted}
          type="email"
          required
          placeholder={i18n("enterEmail")}
          value={context.email}
          onChange={handleEmailChange}
          lang={lang}
        />

        <Button
          type="submit"
          onClick={handleSubmit}
          disabled={context.submitted}
        >
          {i18n("subscribe")}
        </Button>
      </InputContainer>

      {context.submitted && (
        <Subscriped>{i18n("successfullySubscribed")}</Subscriped>
      )}

      <SocialContainer>
        <SocialTitle>{i18n("followUs")}</SocialTitle>
        <SocialIcons lang={lang}>
          <SocialIcon>
            <SocialLink color="#fe7777" href="" target="_blank">
              <FaFacebookF />
            </SocialLink>
          </SocialIcon>

          <SocialIcon>
            <SocialLink href="" target="_blank">
              <FaPinterestP />
            </SocialLink>
          </SocialIcon>

          <SocialIcon>
            <SocialLink href="" target="_blank">
              <FaTwitter />
            </SocialLink>
          </SocialIcon>

          <SocialIcon>
            <SocialLink href="" target="_blank">
              <FaInstagram />
            </SocialLink>
          </SocialIcon>

          <SocialIcon>
            <SocialLink href="" target="_blank">
              <FaLinkedinIn />
            </SocialLink>
          </SocialIcon>
        </SocialIcons>
      </SocialContainer>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  text-align: ${({ lang }) => (lang === "en" ? "left" : "right")};

  @media screen and (max-width: 1280px) {
    flex-direction: column;
    padding: 40px 0;
  }
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

const InputContainer = styled.form`
  display: flex;
  width: 100vw;
  max-width: 350px;

  @media screen and (max-width: 480px) {
    max-width: 320px;
  }
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
  text-align: ${({ lang }) => (lang === "en" ? "left" : "right")};

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

const Subscriped = styled.div`
  color: green;
  float: left;
  font-size: 13px;
  font-weight: 600;
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
  flex-direction: ${({ lang }) => (lang === "en" ? "row" : "row-reverse")};
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

export default Newsletter;
