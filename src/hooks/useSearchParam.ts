import { useSearchParams } from 'react-router-dom'

const useQueryParam = () => {
  const [searchParams] = useSearchParams()
  const params = Object.fromEntries(searchParams)
  return params
}

export default useQueryParam
