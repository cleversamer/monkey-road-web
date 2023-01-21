import { useState } from "react";
import styled from "styled-components";
import {
  FaFacebookF,
  FaPinterestP,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";

const Newsletter = () => {
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
    <Container>
      <Title>Our newsletter</Title>
      <Subtitle>Subscribe to receive all new</Subtitle>

      <InputContainer onSubmit={handleSubmit}>
        <Input
          disabled={context.submitted}
          type="email"
          required
          placeholder="Enter your email"
          value={context.email}
          onChange={handleEmailChange}
        />

        <Button
          type="submit"
          onClick={handleSubmit}
          disabled={context.submitted}
        >
          Subscribe
        </Button>
      </InputContainer>

      {context.submitted && <Subscriped>You're now subscribed.</Subscriped>}

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
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

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
