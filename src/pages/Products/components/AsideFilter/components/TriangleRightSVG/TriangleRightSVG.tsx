type TriangleRightSVGProps = {
  className: string
}

export default function TriangleRightSVG({ className }: TriangleRightSVGProps) {
  return (
    <svg viewBox='0 0 4 7' className={className}>
      <polygon points='4 3.5 0 0 0 7' />
    </svg>
  )
}
