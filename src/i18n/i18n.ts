import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import { productDetail_en, products_en, header_en, cart_en, user_en, footer_en } from 'src/locales/en'
import { productDetail_vi, products_vi, header_vi, cart_vi, user_vi, footer_vi } from 'src/locales/vi'
import { getLanguageFromLocalStorage } from 'src/utils/helper'

export const locales = {
  en: 'English',
  vi: 'Tiếng Việt'
} as const

export const resources = {
  en: {
    productDetail: productDetail_en,
    products: products_en,
    cart: cart_en,
    user: user_en,
    header: header_en,
    footer: footer_en
  },
  vi: {
    productDetail: productDetail_vi,
    products: products_vi,
    cart: cart_vi,
    user: user_vi,
    header: header_vi,
    footer: footer_vi
  }
} as const

export const defaultNS = 'productDetail'

// eslint-disable-next-line import/no-named-as-default-member
void i18next.use(initReactI18next).init({
  resources,
  lng: getLanguageFromLocalStorage(),
  fallbackLng: 'vi',
  defaultNS,
  interpolation: {
    escapeValue: false
  }
})
