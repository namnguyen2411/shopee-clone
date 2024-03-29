const routes = {
  // public routes
  home: '/',
  register: '/register',
  login: '/login',
  logout: '/logout',
  products: '/products',
  product: '/products/:id',
  // private routes
  cart: '/cart',
  profile: '/user/profile',
  purchase: '/user/purchase',
  changePassword: '/user/password'
} as const

export default routes
