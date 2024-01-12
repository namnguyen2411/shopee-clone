type MenuSVGProps = {
  className?: string
}

/**
 * Renders a menu icon as an SVG component.
 *
 * @param {string} className - The Tailwindcss class for the SVG component. Defaults to 'h-3 w-3'.
 * @return {JSX.Element} The rendered SVG component.
 */
export default function MenuSVG({ className = 'h-3 w-3' }: MenuSVGProps): JSX.Element {
  return (
    <svg viewBox='0 0 12 10' className={className}>
      <g fillRule='evenodd' stroke='none' strokeWidth={1}>
        <g transform='translate(-373 -208)'>
          <g transform='translate(155 191)'>
            <g transform='translate(218 17)'>
              <path d='m0 2h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
              <path d='m0 6h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
              <path d='m0 10h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z' />
            </g>
          </g>
        </g>
      </g>
    </svg>
  )
}
