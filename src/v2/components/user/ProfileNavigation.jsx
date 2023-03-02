import { useRef, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import styled from "styled-components";
import PopupConfirm from "v2/hoc/PopupConfirm";
import { routes } from "v2/client";
import useAuth from "v2/auth/useAuth";
import useLocale from "v2/hooks/useLocale";
import usersApi from "v2/api/user/users";
import { HiOutlineKey, HiOutlineLogout } from "react-icons/hi";
import { MdCallReceived } from "react-icons/md";
import { FaRegUser, FaCarAlt } from "react-icons/fa";
import { AiOutlinePlusCircle, AiOutlineDollar } from "react-icons/ai";

const ProfileNavigation = ({ activeItem }) => {
  const imageInputRef = useRef(null);
  const { i18n, lang } = useLocale();
  const { user, logout, setUser } = useAuth();
  const [avatar, setAvatar] = useState({ url: "", value: null });
  const [popupWindow, setPopupWindow] = useState({
    visible: false,
    handler: null,
  });

  const handleLogout = () => {
    if (popupWindow.visible) return;

    const logoutHander = () => {
      logout();

      setPopupWindow({
        visible: false,
        handler: null,
      });
    };

    setPopupWindow({ visible: true, handler: logoutHander });
  };

  const handleAvatarChange = async (e) => {
    const image = e.target.files[0];
    if (!image) {
      // Show warning
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = () => {
      setAvatar({ value: image, url: reader.result });
      handleChangeAvatar(image);
    };
  };

  const handleChangeAvatar = async (image) => {
    let error = "";

    try {
      const body = { avatar: image };
      const res = await usersApi.common.updateProfile(body);
      const { user } = res.data;
      setUser(user);
    } catch (err) {
      error = err?.response?.data?.message[lang] || i18n("networkError");
      setUser(user);
    } finally {
      setAvatar({ url: "", value: null });
    }
  };

  return (
    <>
      {popupWindow.visible && (
        <PopupConfirm
          title={i18n("logoutTitle")}
          subtitle={i18n("logoutSubtitle")}
          hint={i18n("logoutHint")}
          onHide={() => setPopupWindow(false)}
          onConfirm={popupWindow.handler}
        />
      )}

      <Container>
        <Title>{i18n("myAccount")}</Title>

        <BreakLine />

        <NavItems lang={lang}>
          <AvatarContainer onClick={() => imageInputRef.current.click()}>
            <Avatar
              src={
                avatar.url ||
                user.avatarURL ||
                "/assets/images/default_avatar.svg"
              }
              alt={user.name}
            />
            <AvatarIcon />
            <AvatarInput
              ref={imageInputRef}
              type="file"
              accept="image/*"
              hidden
              onChange={handleAvatarChange}
            />
          </AvatarContainer>

          <NavItem active={activeItem === "personal info"}>
            <NavRoute to={routes.personalInfo.navigate()} lang={lang}>
              <FaRegUser />
              <NavItemTitle>{i18n("personalInfo")}</NavItemTitle>
            </NavRoute>
          </NavItem>

          {user.role !== "admin" && (
            <NavItem active={activeItem === "sales posts"}>
              <NavRoute to={routes.salesPosts.navigate()} lang={lang}>
                <FaCarAlt />
                <NavItemTitle>{i18n("salesPosts")}</NavItemTitle>
              </NavRoute>
            </NavItem>
          )}

          {user.role === "office" && (
            <NavItem active={activeItem === "rental posts"}>
              <NavRoute to={routes.rentalPosts.navigate()} lang={lang}>
                <FaCarAlt />
                <NavItemTitle>{i18n("rentalPosts")}</NavItemTitle>
              </NavRoute>
            </NavItem>
          )}

          {user.role !== "admin" && (
            <NavItem active={activeItem === "transactions"}>
              <NavRoute to={routes.myTransactions.navigate()} lang={lang}>
                <AiOutlineDollar size={20} />
                <NavItemTitle>{i18n("transactions")}</NavItemTitle>
              </NavRoute>
            </NavItem>
          )}

          {user.role === "office" && (
            <NavItem active={activeItem === "received orders"}>
              <NavRoute to={routes.myReceivedOrders.navigate()} lang={lang}>
                <MdCallReceived />
                <NavItemTitle>{i18n("receivedOrders")}</NavItemTitle>
              </NavRoute>
            </NavItem>
          )}

          <NavItem active={activeItem === "change password"}>
            <NavRoute to={routes.changePassword.navigate()} lang={lang}>
              <HiOutlineKey />
              <NavItemTitle>{i18n("changePassword")}</NavItemTitle>
            </NavRoute>
          </NavItem>

          <NavItem active={activeItem === "logout"}>
            <NavButton onClick={handleLogout} lang={lang}>
              <HiOutlineLogout />
              <NavItemTitle>{i18n("logoutTitle")}</NavItemTitle>
            </NavButton>
          </NavItem>
        </NavItems>
      </Container>
    </>
  );
};

const Container = styled.div`
  width: 100%;
  min-width: max-content;
  max-width: 250px;
  height: fit-content;
  text-transform: capitalize;
  background-color: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0px 1px 3px 2px rgba(51, 51, 51, 0.3);

  @media screen and (max-width: 540px) {
    max-width: 100%;
  }
`;

const Title = styled.h3`
  text-align: center;
  color: #fe7777;
  font-size: 22px;
  font-weight: 500;
`;

const BreakLine = styled.span`
  display: inline-block;
  width: 100%;
  height: 0px;
  border: 1px solid #fe7777;
`;

const NavItems = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  align-items: ${({ lang }) => (lang === "en" ? "flex-start" : "flex-end")};
`;

const NavItem = styled.li`
  h4 {
    color: ${({ active }) => (active ? "#fe7777" : "#000")};
  }

  svg {
    transition-duration: 176ms;
    font-size: 15px;
    fill: ${({ active }) => (active ? "#fe7777" : "#000")};
  }

  :hover {
    h4 {
      color: #fe7777;
    }

    svg {
      fill: #fe7777;
    }
  }

  :active {
    transform: scale(0.97);
  }
`;

const NavItemTitle = styled.h4`
  font-weight: 600;
  font-size: 15px;
  transition-duration: 176ms;
`;

const NavRoute = styled(RouterLink)`
  display: flex;
  flex-direction: ${({ lang }) => (lang === "en" ? "row" : "row-reverse")};
  align-items: center;
  gap: 7px;
  padding: 10px 0;
  transition-duration: 176ms;
  cursor: pointer;
`;

const NavButton = styled.span`
  display: flex;
  flex-direction: ${({ lang }) => (lang === "en" ? "row" : "row-reverse")};
  align-items: center;
  gap: 7px;
  padding: 10px 0;
  transition-duration: 176ms;
  cursor: pointer;

  :hover {
    h4 {
      color: #fe7777;
    }

    svg {
      fill: #fe7777;
    }
  }

  :active {
    transform: scale(0.99);
  }
`;

const AvatarContainer = styled.div`
  align-self: center;
  position: relative;
  box-shadow: 0px 1px 3px 2px rgba(51, 51, 51, 0.3);
  border-radius: 50%;
  width: 90px;
  height: 90px;
  cursor: pointer;
  margin: 15px 0;
`;

const Avatar = styled.img`
  border-radius: 50%;
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const AvatarIcon = styled(AiOutlinePlusCircle)`
  position: absolute;
  top: 5px;
  right: 2px;
  font-size: 20px;
`;

const AvatarInput = styled.input`
  display: none;
`;

export default ProfileNavigation;
