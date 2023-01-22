import { Routes, Route, Navigate } from "react-router-dom";
import Home from "pages/user/Home";
import NotFound from "pages/user/NotFound";
import Navigation from "components/common/navigation";
import Footer from "components/common/footer";
import Login from "pages/auth/Login";
import FastLogin from "pages/auth/FastLogin";
import Register from "pages/auth/Register";
import Verify from "pages/auth/Verify";
import ForgotPassword from "pages/auth/ForgotPassword";
import ResetPassword from "pages/auth/ResetPassword";
import ResetPasswordSuccess from "pages/auth/ResetPasswordSuccess";
import RentCars from "pages/car/rent/RentCars";
import RentCarDetails from "pages/car/rent/RentCarDetails";
import PurchaseCars from "pages/car/purchase/PurchaseCars";
import RecentlyArrivedPurchaseCars from "pages/car/purchase/RecentlyArrivedPurchaseCars";
import { routes } from "client";

const App = () => {
  return (
    <>
      <Navigation />

      <Routes>
        <Route path={routes.purchaseCars.route} element={<PurchaseCars />} />

        <Route
          path={routes.recentlyArrivedPurchaseCars.route}
          element={<RecentlyArrivedPurchaseCars />}
        />

        <Route path={routes.rentCars.route} element={<RentCars />} />

        <Route
          path={routes.rentCarDetails.route}
          element={<RentCarDetails />}
        />

        <Route
          path={routes.resetPasswordSuccess.route}
          element={<ResetPasswordSuccess />}
        />

        <Route path={routes.resetPassword.route} element={<ResetPassword />} />

        <Route
          path={routes.forgotPassword.route}
          element={<ForgotPassword />}
        />

        <Route path={routes.verify.route} element={<Verify />} />

        <Route path={routes.register.route} element={<Register />} />

        <Route path={routes.fastRegister.route} element={<FastLogin />} />

        <Route path={routes.login.route} element={<Login />} />

        <Route path={routes.notFound.route} element={<NotFound />} />

        <Route path={routes.home.route} element={<Home />} />

        <Route
          path="/"
          element={<Navigate to={routes.home.navigate()} replace />}
        />

        <Route
          path="*"
          element={<Navigate to={routes.notFound.navigate()} replace />}
        />
      </Routes>

      <Footer />
    </>
  );
};

export default App;
