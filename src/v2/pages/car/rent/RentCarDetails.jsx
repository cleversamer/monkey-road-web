import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { animateScroll as scroll } from "react-scroll";
import styled from "styled-components";
import Gallery from "v2/components/car-details/Gallery";
import Details1 from "./details/Details1";
import Details2 from "./details/Details2";
import Details3 from "./details/Details3";
import rentApi from "v2/api/car/rent";
import useLocale from "v2/hooks/useLocale";
import PopupConfirm from "v2/hoc/PopupConfirm";
import { routes } from "v2/client";

const initialState = {
  startDate: "",
  endDate: "",
  noOfDays: 0,
  locationTitle: "",
  longitude: 55.27159786283418,
  latitude: 25.200711712376464,
  fullName: "",
  phoneICC: "",
  phoneNSN: "",
};

const RentCarDetails = () => {
  const navigate = useNavigate();
  const { i18n, lang } = useLocale();
  const { carId } = useParams();
  const [car, setCar] = useState(null);
  const [pages, setPages] = useState({ count: 3, current: 1 });
  const [popupWindow, setPopupWindow] = useState({
    visible: false,
    handler: null,
    loading: false,
  });
  const [context, setContext] = useState(initialState);

  useEffect(() => {
    rentApi.common
      .getRentCarDetails(carId)
      .then((res) => setCar(res.data))
      .catch(() => {});
  }, []);

  const handleRentCar = async () => {
    try {
      const body = {
        ...context,
        noOfDays: calcNoOfDays(),
      };

      await rentApi.common.requestCarRental(carId, body);
      setContext(initialState);
      setPages({ ...pages, current: 1 });
    } catch (err) {}
  };

  const calcNoOfDays = () => {
    const startDate = new Date(context.startDate);
    const endDate = new Date(context.endDate);
    return Math.round((endDate - startDate) / 1000 / 60 / 60 / 24) || 0;
  };

  const handleKeyChange = (key) => (e) =>
    setContext({ ...context, [key]: e.target.value });

  const handleCoordinatesChange = (latitude, longitude) =>
    setContext({ ...context, latitude, longitude });

  const handleNext = () => {
    if (pages.current === pages.count) return;
    setPages({ ...pages, current: pages.current + 1 });
    scroll.scrollToTop();
  };

  const handlePrev = () => {
    if (pages.current === 1) return;
    setPages({ ...pages, current: pages.current - 1 });
    scroll.scrollToTop();
  };

  const handleAccept = async () => {
    try {
      const res = await rentApi.admin.acceptRentCar(car._id);
      setCar(res.data);
    } catch (err) {}
  };

  const handleReject = () => {
    if (popupWindow.visible) return;

    const rejectCar = (reason) => {
      if (!reason) return;

      setPopupWindow({ ...popupWindow, loading: true });

      rentApi.admin
        .rejectRentCar(car._id, reason)
        .then(() => navigate(routes.adminMain.navigate()))
        .catch(() =>
          setPopupWindow({ handler: null, visible: false, loading: false })
        );
    };

    setPopupWindow({ visible: true, handler: rejectCar });
  };

  if (!car) {
    return null;
  }

  return (
    <>
      {popupWindow.visible && (
        <PopupConfirm
          title={i18n("rejectPostTitle")}
          subtitle={i18n("rejectPostSubtitle")}
          withValue
          onHide={() => setPopupWindow({ handler: null, visible: false })}
          onConfirm={popupWindow.handler}
          loading={popupWindow.loading}
        />
      )}

      <Container>
        <Content lang={lang}>
          <Gallery images={car.photos} />
          {pages.current == "1" ? (
            <Details1
              car={car}
              onNext={handleNext}
              onAccept={handleAccept}
              onReject={handleReject}
            />
          ) : pages.current == "2" ? (
            <Details2
              car={car}
              onNext={handleNext}
              onPrev={handlePrev}
              context={context}
              onKeyChange={handleKeyChange}
            />
          ) : pages.current == "3" ? (
            <Details3
              car={car}
              onPrev={handlePrev}
              onComplete={handleRentCar}
              context={context}
              onKeyChange={handleKeyChange}
              onCoordinatesChange={handleCoordinatesChange}
            />
          ) : null}
        </Content>
      </Container>
    </>
  );
};

const Container = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fff;
  width: 100vw;
  max-width: 1366px;
  margin: 0 auto;
  padding: 60px;
  gap: 100px;

  @media screen and (max-width: 480px) {
    padding: 30px;
    padding-bottom: 50px;
  }
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  flex-direction: ${({ lang }) => (lang === "en" ? "row" : "row-reverse")};
  gap: 40px;

  @media screen and (max-width: 870px) {
    flex-direction: column;
  }
`;

export default RentCarDetails;
