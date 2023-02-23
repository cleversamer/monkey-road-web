import styled from "styled-components";
import useLocale from "v2/hooks/useLocale";

const Invoice = ({ items = [], percentageFee, fixedFee }) => {
  const { i18n, lang } = useLocale();

  const calcTotal = () => {
    let total = 0;
    items.forEach((item) => {
      total += item.cost;
    });

    let fees = percentageFee * total + fixedFee;

    total += fees;

    return { total: total.toFixed(2), fees: fees.toFixed(2) };
  };

  return (
    <Container>
      <Title>{i18n("invoice")}</Title>

      <ItemsList>
        {items.map((item) => (
          <Item key={item.title} lang={lang}>
            <ItemTitle>{item.title}</ItemTitle>
            <ItemCost>
              {item.cost} {i18n("aed")}
            </ItemCost>
          </Item>
        ))}

        <Item lang={lang}>
          <ItemTitle>{i18n("paymentFees")}</ItemTitle>
          <ItemCost>
            {calcTotal().fees} {i18n("aed")}
          </ItemCost>
        </Item>

        <BreakLine />

        <Item lang={lang}>
          <ItemTitle>{i18n("total")}</ItemTitle>
          <ItemCost>
            {calcTotal().total} {i18n("aed")}
          </ItemCost>
        </Item>
      </ItemsList>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Title = styled.h4``;

const BreakLine = styled.span`
  display: inline-block;
  width: 100%;
  height: 0px;
  border: 1px solid lightgray;
`;

const ItemsList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Item = styled.li`
  display: flex;
  flex-direction: ${({ lang }) => (lang === "en" ? "row" : "row-reverse")};
  justify-content: space-between;
  font-size: 15px;
  font-weight: 500;
`;

const ItemTitle = styled.span`
  text-transform: capitalize;
`;

const ItemCost = styled.span``;

export default Invoice;
