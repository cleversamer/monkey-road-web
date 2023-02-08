import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import CustomButton from "components/common/custom-button";
import ReusableCar from "..";
import { BiPhone } from "react-icons/bi";
import { AiOutlineWhatsApp } from "react-icons/ai";
import { routes } from "client";
import useAuth from "auth/useAuth";

const PurchaseCar = ({ data }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleMakeCall = () => {};

  const handleWhatsAppCall = () => {};

  const navigateToDetails = () =>
    navigate(routes.purchaseCarDetails.navigate(data._id));

  const handleLikeClick = async () => {
    const isLiked = checkIsLiked();

    if (isLiked) {
      // remove
      return;
    }

    if (!isLiked) {
      // add
      return;
    }
  };

  const checkIsLiked = () => user.favorites.includes(data._id);

  return (
    <ReusableCar
      onClick={navigateToDetails}
      brandName={data.brand.name.en}
      imageURL={data.photos[0]}
      model={data.model}
      name={data.name}
      price={data.price}
      year={data.year}
    >
      <CTAContainer>
        <CustomButton
          type="primary"
          onClick={handleMakeCall}
          title={
            <CallContainer>
              <BiPhone /> Call Seller
            </CallContainer>
          }
        />

        <CustomButton
          type="primary"
          color="#1A8331"
          title={
            <CallContainer>
              <AiOutlineWhatsApp /> WhatsApp
            </CallContainer>
          }
          onClick={handleWhatsAppCall}
        />
      </CTAContainer>

      <LikeBtnContainer>
        <CustomButton
          type="like"
          liked={checkIsLiked()}
          onClick={handleLikeClick}
        />
      </LikeBtnContainer>
    </ReusableCar>
  );
};

const CTAContainer = styled.div`
  padding: 10px 5px;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  display: flex;
  gap: 10px;

  > * {
    height: 32px;
    font-size: 14px;
    font-weight: 400;
  }
`;

const CallContainer = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5px;
  color: #fff;

  svg {
    fill: #fff;
    font-size: 20px;
  }
`;

const LikeBtnContainer = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
`;

export default PurchaseCar;
