import loading from 'src/assets/images/loading.svg'

export default function Loading() {
  return (
    <div className='flex h-[50vh] w-full items-center justify-center'>
      <img src={loading} alt='loading' />
    </div>
  )
}
