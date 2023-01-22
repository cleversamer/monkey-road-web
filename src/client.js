export const routes = {
  home: {
    route: "/home",
    navigate: () => "/home",
  },
  notFound: {
    route: "/not-found",
    navigate: () => "/not-found",
  },
  login: {
    route: "/login",
    navigate: () => "/login",
  },
  fastRegister: {
    route: "/fast-register",
    navigate: (joinBy = "google") => `/fast-register?joinBy=${joinBy}`,
  },
  register: {
    route: "/register",
    navigate: () => "/register",
  },
  verify: {
    route: "/verify/:subject",
    navigate: (subject = "email") => `/verify/${subject}`,
  },
  forgotPassword: {
    route: "/forgot-password",
    navigate: () => "/forgot-password",
  },
  resetPassword: {
    route: "/reset-password",
    navigate: () => "/reset-password",
  },
  resetPasswordSuccess: {
    route: "/continue",
    navigate: () => "/continue",
  },
  rentCars: {
    route: "/cars/rent",
    navigate: (searchTerm = "rent car") => `/cars/rent?term=${searchTerm}`,
  },
  rentCarDetails: {
    route: "/cars/rent/:carId/details",
    navigate: (carId = "some-id") => `/cars/rent/${carId}/details`,
  },
  purchaseCars: {
    route: "/cars/purchase",
    navigate: () => "/cars/purchase",
  },
  recentlyArrivedPurchaseCars: {
    route: "/cars/purchase/recent",
    navigate: () => "/cars/purchase/recent",
  },
  latestPurchaseCarModels: {
    route: "/cars/purchase/latest",
    navigate: () => "/cars/purchase/latest",
  },
  bestPurchaseCarSellers: {
    route: "/cars/purchase/best",
    navigate: () => "/cars/purchase/best",
  },
  popularBrands: {
    route: "/brands/popular",
    navigate: () => "/brands/popular",
  },
};
