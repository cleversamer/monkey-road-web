import styled from "styled-components";
import useLocale from "v1/hooks/useLocale";

const ViewMore = ({ onClick }) => {
  const { i18n } = useLocale();

  return <Container onClick={onClick}>{i18n("viewMore")}</Container>;
};

const Container = styled.div`
  text-transform: capitalize;
  text-align: center;
  font-size: 14px;
  font-weight: 600;
  margin-top: 7px;
  transition-duration: 176ms;
  cursor: pointer;

  :hover {
    color: #fe7777;
  }

  :active {
    transform: scale(0.97);
  }
`;

export default ViewMore;
