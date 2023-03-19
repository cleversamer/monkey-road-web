import styled from "styled-components";
import PopupContainer from "./PopupContainer";
import { IoClose } from "react-icons/io5";
import useLocale from "v2/hooks/useLocale";
import GoogleMap from "v2/components/google-map";

const OrderDetails = ({ order, onHide, children }) => {
  const { i18n, lang } = useLocale();

  return (
    <PopupContainer onHide={onHide}>
      <Container>
        <TopRow>
          <IoClose onClick={onHide} />
          <Title>{i18n("orderDetails")}</Title>
        </TopRow>

        <ReceptionLocation>
          <Title lang={lang}>{i18n("location")}</Title>

          <GoogleMap
            longitude={parseFloat(order.receptionLocation.longitude)}
            latitude={parseFloat(order.receptionLocation.latitude)}
            onCoordinatesChange={() => {}}
          />

          <Title lang={lang}>{i18n("recipientAddress")}</Title>

          <ReceptionLocationName lang={lang}>
            {order.receptionLocation.title}
          </ReceptionLocationName>
        </ReceptionLocation>

        {["paid", "delivered"].includes(order.status) && (
          <ReceptionLocation>
            <Title lang={lang}>{i18n("renterPhone")}</Title>

            <ReceptionLocationName lang={lang}>
              {order.phoneNumber.full}
            </ReceptionLocationName>
          </ReceptionLocation>
        )}

        {!!order.reasonFor.rejection && (
          <ReceptionLocation>
            <Title lang={lang}>{i18n("rejectionReason")}</Title>

            <ReceptionLocationName lang={lang}>
              {order.reasonFor.rejection}
            </ReceptionLocationName>
          </ReceptionLocation>
        )}

        <CTAContainer>{children}</CTAContainer>
      </Container>
    </PopupContainer>
  );
};

const Container = styled.div`
  background-color: #fff;
  width: 350px;
  height: fit-content;
  border-radius: 16px;
  padding: 30px;
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const TopRow = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  svg {
    position: absolute;
    top: 0;
    left: 0;
    transition-duration: 176ms;
    font-size: 20px;
    cursor: pointer;

    :active {
      transform: scale(0.97);
    }
  }
`;

const Title = styled.h5`
  text-transform: capitalize;
  font-size: 16px;
  text-align: ${({ lang }) => (lang === "en" ? "left" : "right")};
`;

const ReceptionLocation = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 7px;

  > div {
    max-height: 300px !important;
    margin-bottom: 10px;
  }
`;

const ReceptionLocationName = styled.p`
  font-size: 13px;
  text-align: ${({ lang }) => (lang === "en" ? "left" : "right")};
`;

const CTAContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;

  button {
    font-size: 15px;
    font-weight: 600;
  }
`;

export default OrderDetails;
