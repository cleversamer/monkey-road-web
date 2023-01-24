import styled from "styled-components";

const LevelsTracker = ({ noOfLevels, activeLevel }) => {
  const levels = [];
  for (let i = 1; i <= noOfLevels; i++) {
    const isActive = i <= activeLevel;

    const item = () => (
      <>
        <Level active={isActive}>{i}</Level>
        {i < noOfLevels && <BreakLine />}
      </>
    );

    levels.push(item);
  }

  return (
    <Container>
      {levels.map((Item, index) => (
        <Item key={index} />
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  width: fit-content;
  margin: 0 auto;
`;

const Level = styled.div`
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background-color: ${({ active }) => (active ? "#fe7777" : "#ccc")};
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 20px;
  font-weight: 500;
`;

const BreakLine = styled.span`
  display: inline-block;
  width: 80px;
  height: 0px;
  border: 1px solid #aaa;
`;

export default LevelsTracker;
