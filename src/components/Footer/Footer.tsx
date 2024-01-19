import clsx from 'clsx'
import { Link } from 'react-router-dom'
import { countries, policies } from 'src/constants/footer'

export default function Footer() {
  return (
    <footer className='w-full bg-neutral-100 p-9'>
      <hr className='bg-gray-500' />
      <div className='container'>
        <div className='mt-10 flex flex-col items-baseline justify-between text-sm text-gray-500 lg:flex-row'>
          <div className='mx-auto flex-shrink-0 pr-6 lg:text-left'>© 2023 Shopee. Tất cả các quyền được bảo lưu.</div>
          <div className='mx-auto mt-2 flex flex-col flex-wrap items-center justify-center gap-1 lg:flex-row lg:gap-0'>
            <div>Quốc gia & Khu vực:</div>
            {countries.map((country, index: number) => (
              <div key={country} className=''>
                <Link
                  to='/'
                  className={clsx('border-r-gray-400 px-1.5 lg:border-r', {
                    'pr-0 lg:border-r-0': index === countries.length - 1
                  })}
                >
                  {country}
                </Link>
              </div>
            ))}
          </div>
        </div>
        <div className='item-center mt-20 flex flex-col items-center justify-center gap-1 text-sm text-gray-500 lg:flex-row lg:gap-0'>
          {policies.map((policy, index: number) => (
            <div key={policy.title}>
              <Link
                to={policy.url}
                className={clsx('border-r-gray-200 md:px-2 lg:border-r lg:px-8', {
                  'pr-0 lg:border-r-0': index === policies.length - 1
                })}
              >
                {policy.title}
              </Link>
            </div>
          ))}
        </div>
        <div className='mt-12 flex flex-col gap-1.5 text-center text-xs text-gray-500'>
          <p className='mb-4'>Công ty TNHH Shopee</p>
          <p>
            Địa chỉ: Tầng 4-5-6, Tòa nhà Capital Place, số 29 đường Liễu Giai, Phường Ngọc Khánh, Quận Ba Đình, Thành
            phố Hà Nội, Việt Nam. Tổng đài hỗ trợ: 19001221 - Email: cskh@hotro.shopee.vn
          </p>
          <p>Chịu Trách Nhiệm Quản Lý Nội Dung: Nguyễn Đức Trí - Điện thoại liên hệ: 024 73081221 (ext 4678)</p>
          <p>Mã số doanh nghiệp: 0106773786 do Sở Kế hoạch & Đầu tư TP Hà Nội cấp lần đầu ngày 10/02/2015</p>
          <p>© 2015 - Bản quyền thuộc về Công ty TNHH Shopee</p>
        </div>
      </div>
    </footer>
  )
}
