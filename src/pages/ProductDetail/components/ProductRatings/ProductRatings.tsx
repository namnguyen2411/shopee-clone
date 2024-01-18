import StarSVG from 'src/components/StarSVG'

type ProductRatingsProps = {
  rating: number
  activeClassName?: string
  nonActiveClassName?: string
  nonActiveStroke?: string
}

export default function ProductRatings({
  rating,
  activeClassName = 'w-4 aspect-square text-yellowStar',
  nonActiveClassName = 'w-4 aspect-square text-transparent',
  nonActiveStroke = '#ee4e2e'
}: ProductRatingsProps) {
  return (
    <div className='flex items-center gap-0.5'>
      {Array(5)
        .fill(0)
        .map((_, index) => {
          const starIndex = index + 1
          if (rating - starIndex >= 0) {
            return <StarSVG key={index} className={activeClassName} />
          } else if (Math.abs(rating - starIndex) < 1) {
            return (
              <div key={index} className='relative flex items-center'>
                <div
                  className='absolute left-0 top-0 z-10 h-full overflow-hidden'
                  style={{ width: `${(1 - Math.abs(rating - starIndex)) * 100}%` }}
                >
                  <StarSVG className={activeClassName} />
                </div>
                <div>
                  <StarSVG className={nonActiveClassName} stroke={nonActiveStroke} />
                </div>
              </div>
            )
          } else {
            return <StarSVG key={index} className={nonActiveClassName} stroke={nonActiveStroke} />
          }
        })}
    </div>
  )
}
