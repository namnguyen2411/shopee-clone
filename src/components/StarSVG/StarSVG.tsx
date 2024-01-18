type StartarSVGProps = {
  className?: string
  stroke?: string
}

/**
 * Renders a star SVG element.
 * @param {string} stroke - The color of the stroke. Defaults to 'currentColor'.
 * @param {string} className - The CSS class name for the SVG element. Default value is 'h-4 w-4'.
 * @returns {JSX.Element} The rendered SVG element.
 */
export default function StarSVG({ stroke = 'currentColor', className = 'h-4 w-4' }: StartarSVGProps): JSX.Element {
  return (
    <svg enableBackground='new 0 0 15 15' viewBox='0 0 15 15' x={0} y={0} className={className}>
      <polygon
        points='7.5 .8 9.7 5.4 14.5 5.9 10.7 9.1 11.8 14.2 7.5 11.6 3.2 14.2 4.3 9.1 .5 5.9 5.3 5.4'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeMiterlimit={10}
        fill='currentColor'
        fillRule='evenodd'
        stroke={stroke}
      />
    </svg>
  )
}
