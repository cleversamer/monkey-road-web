import { useState } from "react";
import styled from "styled-components";
import { BiPlus, BiMinus } from "react-icons/bi";
import useLocale from "v2/hooks/useLocale";

const FilterSection = ({ title, withIcon, children }) => {
  const { lang } = useLocale();
  const [showContent, setShowContent] = useState(true);

  return (
    <Container>
      <TopRow lang={lang}>
        <SectionTitle>{title}</SectionTitle>

        {withIcon && !showContent && (
          <BiPlus onClick={() => setShowContent(true)} />
        )}

        {withIcon && showContent && (
          <BiMinus onClick={() => setShowContent(false)} />
        )}
      </TopRow>

      {showContent && children}
    </Container>
  );
};

const Container = styled.section`
  padding: 15px;
  border-bottom: 1.5px solid #c2c2c2;

  :first-of-type {
    padding-top: 10px;
  }

  :last-of-type {
    border-bottom: none;
  }
`;

const TopRow = styled.div`
  display: flex;
  flex-direction: ${({ lang }) => (lang === "en" ? "row" : "row-reverse")};
  justify-content: space-between;
  align-items: center;

  svg {
    cursor: pointer;
  }
`;

const SectionTitle = styled.h4``;

export default FilterSection;
