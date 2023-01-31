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
    navigate: (searchTerm = "car") => `/cars/rent?term=${searchTerm}`,
  },
  rentCarDetails: {
    route: "/cars/rent/:carId/details",
    navigate: (carId = "invalid-id") => `/cars/rent/${carId}/details`,
  },
  purchaseCars: {
    route: "/cars/purchase",
    navigate: () => "/cars/purchase",
  },
  recentlyArrivedPurchaseCars: {
    route: "/cars/purchase/recent",
    navigate: (searchTerm = "car") =>
      `/cars/purchase/recent?term=${searchTerm}`,
  },
  latestPurchaseCarModels: {
    route: "/cars/purchase/latest",
    navigate: (searchTerm = "car") =>
      `/cars/purchase/latest?term=${searchTerm}`,
  },
  bestPurchaseCarSellers: {
    route: "/cars/purchase/best",
    navigate: (searchTerm = "car") => `/cars/purchase/best?term=${searchTerm}`,
  },
  purchaseCarDetails: {
    route: "/cars/purchase/:carId/details",
    navigate: (carId = "invalid-id") => `/cars/purchase/${carId}/details`,
  },
  popularBrands: {
    route: "/brands/popular",
    navigate: () => "/brands/popular",
  },
  addRentCar: {
    route: "/cars/rent/add",
    navigate: () => "/cars/rent/add",
  },
  addPurchaseCar: {
    route: "/cars/purchase/add",
    navigate: () => "/cars/purchase/add",
  },
  myFavorites: {
    route: "/favorites/my",
    navigate: () => "/favorites/my",
  },
  myOrders: {
    route: "/orders/my",
    navigate: () => "/orders/my",
  },
  completeOrder: {
    route: "/orders/:orderId/complete",
    navigate: (orderId = "1") => `/orders/${orderId}/complete`,
  },
  personalInfo: {
    route: "/profile/info",
    navigate: () => `/profile/info`,
  },
  salesPosts: {
    route: "/posts/sales",
    navigate: () => `/posts/sales`,
  },
  rentalPosts: {
    route: "/posts/rental",
    navigate: () => `/posts/rental`,
  },
};
