export default function NotFound() {
  return (
    <div className='flex h-[50vh] w-full flex-col items-center justify-center'>
      <h1 className='text-9xl font-extrabold tracking-widest text-black'>404</h1>
      <div className='absolute rotate-12 rounded bg-primary px-2 text-sm'>Page Not Found</div>
      <p className='mt-5 text-xl'>The page you are looking for could not be found.</p>
    </div>
  )
}
