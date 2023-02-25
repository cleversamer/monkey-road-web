import styled from "styled-components";

const Price = ({ period, amount }) => {
  return (
    <Container>
      <Image src="/assets/images/calender.svg" alt="calender icon" />
      <Period>{period}</Period>
      <Amount>{amount.toLocaleString()} AED</Amount>
    </Container>
  );
};

const Container = styled.li`
  position: relative;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
`;

const Image = styled.img`
  width: 90px;
  object-fit: contain;
`;

const Period = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #fe7777;
  text-transform: capitalize;
  font-size: 15px;
  font-weight: 600;
`;

const Amount = styled.span`
  color: #fe7777;
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 600;
`;

export default Price;
