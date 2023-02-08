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
import LatestModelsPurchaseCars from "pages/car/purchase/LatestModelsPurchaseCars";
import BestSellerPurchaseCars from "pages/car/purchase/BestSellerPurchaseCars";
import PurchaseCarDetails from "pages/car/purchase/PurchaseCarDetails";
import AddPurchaseCar from "pages/car/purchase/AddPurchaseCar";
import Brands from "pages/brand/Brands";
import AddRentCar from "pages/car/rent/AddRentCar";
import MyFavorites from "pages/user/MyFavorites";
import MyOrders from "pages/order/MyOrders";
import CompleteOrder from "pages/order/CompleteOrder";
import PersonalInfo from "pages/user/PersonalInfo";
import SalesPosts from "pages/user/SalesPosts";
import RentalPosts from "pages/user/RentalPosts";
import ChangePassword from "pages/user/ChangePassword";
import MyReceivedOrders from "pages/user/MyReceivedOrders";
import Alerts from "pages/user/Alerts";
import { routes } from "client";

import AuthContext from "auth/context";
import usersApi from "api/user/users";
import { useEffect, useState } from "react";
import Splash from "pages/user/Splash";

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const startDate = Date.now();
    let timeoutId;

    usersApi.common
      .isAuth()
      .then((res) => setUser(res.data))
      .catch((err) => {})
      .finally(() => {
        const endDate = Date.now();
        const timeElapsed = endDate - startDate;

        timeoutId = setTimeout(() => {
          setLoading(false);
        }, 3000 - timeElapsed);
      });

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  if (loading) {
    return <Splash />;
  }

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <Navigation />

      <Routes>
        {/* user routes */}
        {user && (
          <>
            <Route path={routes.verify.route} element={<Verify />} />
            <Route path={routes.alerts.route} element={<Alerts />} />
            <Route
              path={routes.changePassword.route}
              element={<ChangePassword />}
            />
            <Route path={routes.salesPosts.route} element={<SalesPosts />} />
            <Route
              path={routes.personalInfo.route}
              element={<PersonalInfo />}
            />
            <Route
              path={routes.completeOrder.route}
              element={<CompleteOrder />}
            />
            <Route path={routes.myOrders.route} element={<MyOrders />} />
            <Route path={routes.myFavorites.route} element={<MyFavorites />} />
            <Route
              path={routes.addPurchaseCar.route}
              element={<AddPurchaseCar />}
            />
          </>
        )}

        {/* office routes */}
        {user && user.role === "office" && (
          <>
            <Route
              path={routes.myReceivedOrders.route}
              element={<MyReceivedOrders />}
            />
            <Route path={routes.rentalPosts.route} element={<RentalPosts />} />
            <Route path={routes.addRentCar.route} element={<AddRentCar />} />
          </>
        )}

        {/* only visitor routes */}
        {!user && (
          <>
            <Route path={routes.register.route} element={<Register />} />
            <Route path={routes.fastRegister.route} element={<FastLogin />} />
            <Route path={routes.login.route} element={<Login />} />
            <Route
              path={routes.forgotPassword.route}
              element={<ForgotPassword />}
            />
            <Route
              path={routes.resetPasswordSuccess.route}
              element={<ResetPasswordSuccess />}
            />
          </>
        )}

        <Route path={routes.resetPassword.route} element={<ResetPassword />} />
        <Route path={routes.popularBrands.route} element={<Brands />} />
        <Route path={routes.purchaseCars.route} element={<PurchaseCars />} />
        <Route
          path={routes.purchaseCarDetails.route}
          element={<PurchaseCarDetails />}
        />
        <Route
          path={routes.bestPurchaseCarSellers.route}
          element={<BestSellerPurchaseCars />}
        />
        <Route
          path={routes.recentlyArrivedPurchaseCars.route}
          element={<RecentlyArrivedPurchaseCars />}
        />
        <Route
          path={routes.latestPurchaseCarModels.route}
          element={<LatestModelsPurchaseCars />}
        />
        <Route path={routes.rentCars.route} element={<RentCars />} />
        <Route
          path={routes.rentCarDetails.route}
          element={<RentCarDetails />}
        />
        {/* <Route path={routes.notFound.route} element={<NotFound />} /> */}
        <Route path={routes.home.route} element={<Home />} />
        <Route path="/" element={<Navigate to={routes.home.route} replace />} />
        <Route path="*" element={<Navigate to={routes.home.route} replace />} />
      </Routes>

      <Footer />
    </AuthContext.Provider>
  );
};

export default App;
