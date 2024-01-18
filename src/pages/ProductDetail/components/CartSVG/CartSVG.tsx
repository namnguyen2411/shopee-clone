type CartSVGProps = {
  className?: string
}

/**
 * Renders a Cart SVG component.
 * @param {CartSVGProps} props - The props object containing the className property. Default: 'h-5 w-5 fill-current text-primary stroke-primary'
 * @return {JSX.Element} The rendered Cart SVG component.
 */

export default function CartSVG({
  className = 'h-5 w-5 fill-current text-primary stroke-primary'
}: CartSVGProps): JSX.Element {
  return (
    <svg enableBackground='new 0 0 15 15' viewBox='0 0 15 15' x={0} y={0} className={className}>
      <g>
        <g>
          <polyline
            fill='none'
            points='.5 .5 2.7 .5 5.2 11 12.4 11 14.5 3.5 3.7 3.5'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeMiterlimit={10}
          />
          <circle cx={6} cy='13.5' r={1} stroke='none' />
          <circle cx='11.5' cy='13.5' r={1} stroke='none' />
        </g>
        <line fill='none' strokeLinecap='round' strokeMiterlimit={10} x1='7.5' x2='10.5' y1={7} y2={7} />
        <line fill='none' strokeLinecap='round' strokeMiterlimit={10} x1={9} x2={9} y1='8.5' y2='5.5' />
      </g>
    </svg>
  )
}
