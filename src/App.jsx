import { Routes, Route, Navigate } from "react-router-dom";
import Home from "pages/user/Home";
import NotFound from "pages/user/NotFound";
import Navbar from "components/common/navbar";
import Footer from "components/common/footer";
import Login from "pages/auth/Login";
import FastLogin from "pages/auth/FastLogin";
import Register from "pages/auth/Register";
import Verify from "pages/auth/Verify";
import ForgotPassword from "pages/auth/ForgotPassword";
import ResetPassword from "pages/auth/ResetPassword";
import ResetPasswordSuccess from "pages/auth/ResetPasswordSuccess";
import { ROUTES } from "client";

const App = () => {
  return (
    <>
      <Navbar />

      <Routes>
        <Route
          path={ROUTES.CLIENT.RESET_PASSWORD_SUCCESS}
          element={<ResetPasswordSuccess />}
        />
        <Route
          path={ROUTES.CLIENT.RESET_PASSWORD}
          element={<ResetPassword />}
        />
        <Route
          path={ROUTES.CLIENT.FORGOT_PASSWORD}
          element={<ForgotPassword />}
        />
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
