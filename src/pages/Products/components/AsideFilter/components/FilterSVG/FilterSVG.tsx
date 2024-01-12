type FilterSVGProps = {
  className?: string
}

/**
 * Renders an SVG filter element with the specified className.
 *
 * @param {string} className - The Tailwindcss class for the SVG component. Defaults to 'h-3 w-3'.
 * @return {JSX.Element} The rendered SVG element.
 */
export default function FilterSVG({ className = 'h-3 w-3' }: FilterSVGProps) {
  return (
    <svg enableBackground='new 0 0 15 15' viewBox='0 0 15 15' x={0} y={0} className={className}>
      <g>
        <polyline
          fill='transparent'
          points='5.5 13.2 5.5 5.8 1.5 1.2 13.5 1.2 9.5 5.8 9.5 10.2'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeMiterlimit={10}
          stroke='currentColor'
        />
      </g>
    </svg>
  )
}
