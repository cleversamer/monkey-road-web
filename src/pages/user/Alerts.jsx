import { useState, useEffect } from "react";
import styled from "styled-components";
import Location from "components/common/search-page/Location";
import ProfileNavigation from "components/user/ProfileNavigation";
import Alert from "components/alert";

const testAlerts = [
  {
    title: "Post added successfully",
    body: "Lorem ipsum dolor sit amet consectetur. Enim dui consequat ut nunc sed. Laoreet integer Lorem ipsum dolor sit amet consectetur. Enim dui consequat ut nunc sed. Laoreet integer ",
    date: new Date().toString(),
    seen: false,
  },
  {
    title: "Post added successfully",
    body: "Lorem ipsum dolor sit amet consectetur. Enim dui consequat ut nunc sed. Laoreet integer Lorem ipsum dolor sit amet consectetur. Enim dui consequat ut nunc sed. Laoreet integer ",
    date: "Fri Jan 26 2023 8:28:46 GMT+0200 (Eastern European Standard Time)",
    seen: true,
  },
  {
    title: "Post added successfully",
    body: "Lorem ipsum dolor sit amet consectetur. Enim dui consequat ut nunc sed. Laoreet integer Lorem ipsum dolor sit amet consectetur. Enim dui consequat ut nunc sed. Laoreet integer ",
    date: "Fri Jan 29 2023 8:28:46 GMT+0200 (Eastern European Standard Time)",
    seen: true,
  },
  {
    title: "Post added successfully",
    body: "Lorem ipsum dolor sit amet consectetur. Enim dui consequat ut nunc sed. Laoreet integer Lorem ipsum dolor sit amet consectetur. Enim dui consequat ut nunc sed. Laoreet integer ",
    date: "Fri Jan 31 2023 8:28:46 GMT+0200 (Eastern European Standard Time)",
    seen: true,
  },
];

const Alerts = () => {
  const [alerts, setAlerts] = useState(testAlerts);

  useEffect(() => {
    // fetch posts
  }, []);

  return (
    <Container>
      <Location pageTitles={["home", ">", "alerts"]} />

      <Content>
        <ProfileNavigation activeItem="" />

        {!alerts.length && (
          <EmptyAlerts>
            <EmptyAlertsImage src="/assets/images/empty-4.svg" alt="" />
            <EmptyAlertsTitle>No alerts right now!</EmptyAlertsTitle>
            <EmptyAlertsSubtitle>You are up to date</EmptyAlertsSubtitle>
          </EmptyAlerts>
        )}

        {!!alerts.length && (
          <AlertsContainer>
            {alerts.map((alert, index) => (
              <Alert key={alert.title + index} alert={alert} />
            ))}
          </AlertsContainer>
        )}
      </Content>
    </Container>
  );
};

const Container = styled.main`
  width: 100vw;
  max-width: 1366px;
  margin: 0 auto;
  background-color: #fafafa;
  padding: 60px;
  display: flex;
  flex-direction: column;
  gap: 50px;

  @media screen and (max-width: 768px) {
    padding: 30px;
    padding-bottom: 50px;
  }
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  gap: 30px;

  @media screen and (max-width: 900px) {
    flex-direction: column;
    align-items: center;
  }
`;

const EmptyAlerts = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const EmptyAlertsImage = styled.img`
  width: 180px;
`;

const EmptyAlertsTitle = styled.h4`
  text-transform: capitalize;
`;

const EmptyAlertsSubtitle = styled.h5`
  font-weight: 600;
`;

const AlertsContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export default Alerts;
