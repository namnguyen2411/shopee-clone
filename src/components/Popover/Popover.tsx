import { useState, useRef, type ElementType } from 'react'
import { useHover, safePolygon, useInteractions, useFloating, arrow, FloatingArrow, offset } from '@floating-ui/react'
import { autoPlacement } from '@floating-ui/react-dom'

interface Props {
  children: React.ReactNode
  renderPopover: React.ReactNode
  className?: string
  as?: ElementType
}

export default function Popover({ children, className, renderPopover, as: Element = 'div' }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const arrowRef = useRef(null)
  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    middleware: [
      offset(2),
      arrow({ element: arrowRef }),
      autoPlacement({
        allowedPlacements: ['top-start', 'bottom-end']
      })
    ]
  })
  const hover = useHover(context, {
    handleClose: safePolygon()
  })

  const { getReferenceProps, getFloatingProps } = useInteractions([hover])

  return (
    <Element className={className} ref={refs.setReference} {...getReferenceProps()}>
      {children}
      {isOpen && (
        <div ref={refs.setFloating} {...getFloatingProps()} style={floatingStyles}>
          <FloatingArrow ref={arrowRef} context={context} fill='white' height={8} width={16} />
          {renderPopover}
        </div>
      )}
    </Element>
  )
}
