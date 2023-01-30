import styled from "styled-components";

const Invoice = ({ items = [], percentageFee, fixedFee }) => {
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
      <Title>Invoice</Title>

      <ItemsList>
        {items.map((item) => (
          <Item key={item.title}>
            <ItemTitle>{item.title}</ItemTitle>
            <ItemCost>{item.cost} AED</ItemCost>
          </Item>
        ))}

        <Item>
          <ItemTitle>Payment fees</ItemTitle>
          <ItemCost>{calcTotal().fees} AED</ItemCost>
        </Item>

        <BreakLine />

        <Item>
          <ItemTitle>Total</ItemTitle>
          <ItemCost>{calcTotal().total} AED</ItemCost>
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
  justify-content: space-between;
  font-size: 15px;
  font-weight: 500;
`;

const ItemTitle = styled.span`
  text-transform: capitalize;
`;

const ItemCost = styled.span``;

export default Invoice;
