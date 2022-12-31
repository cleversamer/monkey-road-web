import styled from "styled-components";
import SocialIcon from "./SocialIcon";

const SocialIconsList = () => {
  return (
    <Container>
      <SocialIcon
        iconPath="/assets/icons/social/whatsapp.svg"
        title="WhatsApp"
        color="#1A8331CC"
      />

      <SocialIcon
        iconPath="/assets/icons/social/instagram.svg"
        title="Instagram"
        color="#DD3535CC"
      />

      <SocialIcon
        iconPath="/assets/icons/social/mail.svg"
        title="Email"
        color="#495BFFCC"
      />
    </Container>
  );
};

const Container = styled.ul`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 20px;
  width: 420px;
`;

export default SocialIconsList;
