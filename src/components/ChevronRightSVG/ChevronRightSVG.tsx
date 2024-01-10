type ChevronRightSVGProps = {
  className?: string
  color?: string
}

/**
 * Creates an SVG component for a chevron right icon.
 * @param {string} color - The color of the icon. Defaults to '#b2b7c0'.
 * @param {string} className - The CSS class name for the icon. Defaults to 'h-4 w-4'.
 * @return {JSX.Element} The SVG component for the chevron right icon.
 */
export default function ChevronRightSVG({
  color = '#b2b7c0',
  className = 'h-4 w-4'
}: ChevronRightSVGProps): JSX.Element {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={1.5}
      stroke='currentColor'
      className={className}
      color={color}
    >
      <path strokeLinecap='round' strokeLinejoin='round' d='m8.25 4.5 7.5 7.5-7.5 7.5' />
    </svg>
  )
}
