import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import CustomButton from "v2/components/common/custom-button";
import ReusableCar from "../index";
import { BiPhone } from "react-icons/bi";
import { AiOutlineWhatsApp } from "react-icons/ai";
import { routes } from "v2/client";
import useAuth from "v2/auth/useAuth";
import useLocale from "v2/hooks/useLocale";
import usersApi from "v2/api/user/users";

const PurchaseCar = ({ data }) => {
  const { i18n, lang } = useLocale();
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleMakeCall = () => {};

  const handleWhatsAppCall = () => {};

  const navigateToDetails = () =>
    navigate(routes.purchaseCarDetails.navigate(data._id));

  const handleLikeClick = async () => {
    try {
      const isLiked = checkIsLiked();

      if (isLiked) {
        const res = await usersApi.common.deleteFromFavorites(data._id);
        const { favorites } = res.data;
        setUser({ ...user, favorites });
        return;
      }

      const res = await usersApi.common.addToFavorites(data._id);
      const { favorites } = res.data;
      setUser({ ...user, favorites });
    } catch (err) {}
  };

  const checkIsLiked = () => user?.favorites?.includes(data._id);

  return (
    <ReusableCar
      onClick={navigateToDetails}
      brandName={data.brand.name[lang]}
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
            <a href={`tel:${data.phoneNumber}`}>
              <CallContainer lang={lang}>
                <BiPhone /> {i18n("callSeller")}
              </CallContainer>
            </a>
          }
        />

        <CustomButton
          type="primary"
          color="#1A8331"
          title={
            <a href={`https://wa.me/${data.phoneNumber}`} target="_blank">
              <CallContainer lang={lang}>
                <AiOutlineWhatsApp /> {i18n("whatsApp")}
              </CallContainer>
            </a>
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
  flex-direction: ${({ lang }) => (lang === "en" ? "row" : "row-reverse")};
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
