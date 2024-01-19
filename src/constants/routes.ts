const routes = {
  // public routes
  home: '/',
  register: '/register',
  login: '/login',
  logout: '/logout',
  products: '/products',
  product: '/products/:id',
  // private routes
  profile: '/user/profile',
  purchases: '/user/purchases',
  categories: '/categories',
  addToCart: '/purchases/add-to-cart',
  updatePurchase: '/purchases/update-purchase',
  buyPurchase: '/purchases/buy-products',
  updateProfile: '/user',
  uploadAvatar: '/user/upload-avatar'
} as const

export default routes
