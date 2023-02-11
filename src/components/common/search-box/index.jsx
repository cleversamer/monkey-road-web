import styled from "styled-components";
import useLocale from "hooks/useLocale";

const HeaderSearch = ({
  searchTerm,
  placeholder,
  onSubmit,
  onSearchChange,
}) => {
  const { i18n, lang } = useLocale();

  return (
    <Container onSubmit={onSubmit}>
      <HeaderSearchInput
        lang={lang}
        value={searchTerm}
        onChange={onSearchChange}
        placeholder={placeholder || i18n("headerSearchPlaceholder")}
      />

      <HeaderSearchIconContainer type="submit">
        <HeaderSearchIcon src="/assets/icons/search.svg" alt="search icon" />
      </HeaderSearchIconContainer>
    </Container>
  );
};

const Container = styled.form`
  width: 120%;
  max-width: 400px;
  position: relative;
  height: 40px;
`;

const HeaderSearchInput = styled.input`
  width: 100%;
  height: 100%;
  border-radius: 40px;
  border: 1px solid #fe7777;
  padding-left: 20px;
  padding-right: 50px;
  outline: none;
`;

const HeaderSearchIconContainer = styled.button`
  background-color: #fe7777;
  border-radius: 200px;
  height: 100%;
  width: 40px;
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  outline: none;
  border: none;
`;

const HeaderSearchIcon = styled.img`
  width: 20px;

  :hover {
    transform: scale(0.97);
  }

  :active {
    transform: scale(0.95);
  }
`;

export default HeaderSearch;
