import { Routes, Route, Navigate } from "react-router-dom";
import Home from "pages/Home";
import NotFound from "pages/NotFound";
import Navbar from "components/common/navbar";
import Footer from "components/common/footer";
import Login from "pages/Login";
import FastLogin from "pages/FastLogin";
import Register from "pages/Register";
import Verify from "pages/Verify";
import { ROUTES } from "client";

const App = () => {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path={ROUTES.CLIENT.VERIFY} element={<Verify />} />
        <Route path={ROUTES.CLIENT.REGISTER} element={<Register />} />
        <Route path={ROUTES.CLIENT.FAST_LOGIN} element={<FastLogin />} />
        <Route path={ROUTES.CLIENT.LOGIN} element={<Login />} />
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

      <Footer />
    </>
  );
};

export default App;
