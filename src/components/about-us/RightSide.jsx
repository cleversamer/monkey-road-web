import styled from "styled-components";

const RightSide = () => {
  return (
    <Container>
      <Paragraph>
        Lorem ipsum dolor sit amet consectetur. Arcu pellentesque sit in nisi
        nunc justo vel nascetur. Id massa commodo diam eget in arcu faucibus.
        Sociis parturient purus ultricies blandit. Ipsum nunc turpis vel
        senectus neque tortor feugiat tristique sem. Ultricies a odio urna porta
        volutpat consequat. Sit sem orci et duis purus etiam. Habitasse nibh
        massa scelerisque ante eu et. Id vitae quis urna laoreet vehicula vel.
        Massa curabitur morbi sit pulvinar eget. Natoque adipiscing sit a et
        dolor fringilla viverra nisl.
      </Paragraph>
    </Container>
  );
};

const Container = styled.div`
  width: 60%;
`;

const Paragraph = styled.p`
  font-size: 18px;
  font-weight: 400;
  text-align: justify;
  line-height: 35px;
`;

export default RightSide;
