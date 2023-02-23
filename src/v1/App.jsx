import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Home from "v1/pages/user/Home";
import Navigation from "v1/components/common/navigation";
import Footer from "v1/components/common/footer";
import Login from "v1/pages/auth/Login";
import FastRegister from "v1/pages/auth/FastRegister";
import Register from "v1/pages/auth/Register";
import Verify from "v1/pages/auth/Verify";
import ForgotPassword from "v1/pages/auth/ForgotPassword";
import ResetPassword from "v1/pages/auth/ResetPassword";
import ResetPasswordSuccess from "v1/pages/auth/ResetPasswordSuccess";
import RentCars from "v1/pages/car/rent/RentCars";
import RentCarDetails from "v1/pages/car/rent/RentCarDetails";
import PurchaseCars from "v1/pages/car/purchase/PurchaseCars";
import RecentlyArrivedPurchaseCars from "v1/pages/car/purchase/RecentlyArrivedPurchaseCars";
import LatestModelsPurchaseCars from "v1/pages/car/purchase/LatestModelsPurchaseCars";
import BestSellerPurchaseCars from "v1/pages/car/purchase/BestSellerPurchaseCars";
import PurchaseCarDetails from "v1/pages/car/purchase/PurchaseCarDetails";
import AddPurchaseCar from "v1/pages/car/purchase/AddPurchaseCar";
import Brands from "v1/pages/brand/Brands";
import AddRentCar from "v1/pages/car/rent/AddRentCar";
import MyFavorites from "v1/pages/user/MyFavorites";
import MyOrders from "v1/pages/order/MyOrders";
import CompleteOrder from "v1/pages/order/CompleteOrder";
import PersonalInfo from "v1/pages/user/PersonalInfo";
import SalesPosts from "v1/pages/user/SalesPosts";
import RentalPosts from "v1/pages/user/RentalPosts";
import ChangePassword from "v1/pages/user/ChangePassword";
import MyReceivedOrders from "v1/pages/user/MyReceivedOrders";
import Alerts from "v1/pages/user/Alerts";
import { routes } from "v1/client";

import AuthContext from "v1/auth/context";
import usersApi from "v1/api/user/users";
import { useEffect, useState } from "react";
import Splash from "v1/pages/user/Splash";
import socket from "v1/socket/client";
import authStorage from "v1/auth/storage";
import MainScreen from "v1/pages/admin/MainScreen";

const App = () => {
  const [user, setUser] = useState(null);
  const [lang, setLang] = useState(authStorage.getLanguage());
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const startDate = Date.now();
    let timeoutId;

    usersApi.common
      .isAuth()
      .then((res) => {
        const user = res.data;
        setUser(user);
        if (!user.verified.email) {
          navigate(routes.verify.navigate("email"));
        }
      })
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
    <AuthContext.Provider value={{ user, setUser, socket, lang, setLang }}>
      {(!user || (user && user.role !== "admin")) && <Navigation />}

      <Routes>
        {/* admin routes */}
        {user && user.role === "admin" && (
          <>
            <Route path={routes.adminMain.route} element={<MainScreen />} />
            <Route
              path="/"
              element={
                <Navigate
                  to={
                    !user.verified.email
                      ? routes.verify.navigate("email")
                      : routes.adminMain.route
                  }
                  replace
                />
              }
            />
            <Route
              path="*"
              element={
                <Navigate
                  to={
                    !user.verified.email
                      ? routes.verify.navigate("email")
                      : routes.adminMain.route
                  }
                  replace
                />
              }
            />
          </>
        )}

        {/* unverified user routes */}
        {user && (!user.verified.email || !user.verified.phone) && (
          <Route path={routes.verify.route} element={<Verify />} />
        )}

        {/* user routes */}
        {user && user.role !== "admin" && (
          <>
            <Route
              path={routes.personalInfo.route}
              element={<PersonalInfo />}
            />
            <Route
              path={routes.changePassword.route}
              element={<ChangePassword />}
            />
            <Route path={routes.alerts.route} element={<Alerts />} />
          </>
        )}

        {/* verified user routes */}
        {user && user.role !== "admin" && user.verified.email && (
          <>
            <Route path={routes.salesPosts.route} element={<SalesPosts />} />
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
        {user &&
          user.role !== "admin" &&
          user.verified.email &&
          user.role === "office" && (
            <>
              <Route
                path={routes.myReceivedOrders.route}
                element={<MyReceivedOrders />}
              />
              <Route
                path={routes.rentalPosts.route}
                element={<RentalPosts />}
              />
              <Route path={routes.addRentCar.route} element={<AddRentCar />} />
            </>
          )}

        {/* only visitor routes */}
        {!user && (
          <>
            <Route path={routes.register.route} element={<Register />} />
            <Route
              path={routes.fastRegister.route}
              element={<FastRegister />}
            />
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

        {(!user || (user && user.role !== "admin")) && (
          <>
            <Route
              path={routes.resetPassword.route}
              element={<ResetPassword />}
            />
            <Route path={routes.popularBrands.route} element={<Brands />} />
            <Route
              path={routes.purchaseCars.route}
              element={<PurchaseCars />}
            />
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
            <Route
              path="/"
              element={
                <Navigate
                  to={
                    user && !user.verified.email
                      ? routes.verify.navigate("email")
                      : routes.home.route
                  }
                  replace
                />
              }
            />
            <Route
              path="*"
              element={
                <Navigate
                  to={
                    user && !user.verified.email
                      ? routes.verify.navigate("email")
                      : routes.home.route
                  }
                  replace
                />
              }
            />
          </>
        )}
      </Routes>

      {(!user || (user && user.role !== "admin")) && <Footer />}
    </AuthContext.Provider>
  );
};

export default App;
