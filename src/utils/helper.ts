import userImage from 'src/assets/images/user.svg'

export function formatCurrency(currency: number) {
  return new Intl.NumberFormat('de-DE').format(currency)
}

export function formatNumberToSocialStyle(value: number) {
  return new Intl.NumberFormat('en', {
    notation: 'compact',
    maximumFractionDigits: 1
  })
    .format(value)
    .replace('.', ',')
    .toLowerCase()
}

export function discountPercentage(price: number, salePrice: number) {
  return Math.round((1 - salePrice / price) * 100)
}

export const getIdFromNameId = (nameId: string) => {
  const arr = nameId.split('-i-')
  return arr[arr.length - 1]
}

const removeSpecialCharacter = (str: string) =>
  // eslint-disable-next-line no-useless-escape
  str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, '')

export const generateNameId = ({ name, id }: { name: string; id: string }) => {
  return removeSpecialCharacter(name).replace(/\s/g, '-') + `-i-${id}`
}

export const hideText = (text: string, start: number = 0, end: number = text.length, replaceWith: string = '*') => {
  if (end <= start) return ''

  const firstPart = text.substring(0, start)
  const middlePart = text.substring(start, end).replace(/./g, replaceWith)
  const lastPart = text.substring(end)

  return `${firstPart}${middlePart}${lastPart}`
}

export const getAvatarUrl = (avatarName?: string) =>
  avatarName ? `${import.meta.env.VITE_API_BASE_URL}images/${avatarName}` : userImage
