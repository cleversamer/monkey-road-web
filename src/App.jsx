import { Routes, Route, Navigate } from "react-router-dom";
import styled from "styled-components";
import Home from "pages/Home";
import NotFound from "pages/NotFound";
import Navbar from "components/navbar";
import { ROUTES } from "client";

const App = () => {
  return (
    <Container>
      <Navbar />

      <Routes>
        <Route path={ROUTES.CLIENT.NOT_FOUND} element={<NotFound />} />
        <Route path={ROUTES.CLIENT.HOME} element={<Home />} />
        <Route
          path="/"
          element={<Navigate to={ROUTES.CLIENT.HOME} replace />}
        />
        <Route
          path="*"
          element={<Navigate to={ROUTES.CLIENT.NOT_FOUND} replace />}
        />
      </Routes>
    </Container>
  );
};

const Container = styled.div`
  overflow: hidden;
`;

export default App;
