import { useState, useRef } from 'react'
import { useHover, safePolygon, useInteractions, useFloating, arrow, FloatingArrow, offset } from '@floating-ui/react'
import { autoPlacement } from '@floating-ui/react-dom'
import { m, LazyMotion, domAnimation, AnimatePresence } from 'framer-motion'

interface Props {
  children: React.ReactNode
  renderPopover: React.ReactNode
  className?: string
}

export default function Popover({ children, className, renderPopover }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const arrowRef = useRef(null)
  const { refs, floatingStyles, context, middlewareData } = useFloating({
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
    <div className={className} ref={refs.setReference} {...getReferenceProps()}>
      {children}
      <AnimatePresence>
        {isOpen && (
          <div ref={refs.setFloating} {...getFloatingProps()} style={floatingStyles}>
            <LazyMotion features={domAnimation}>
              <m.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ duration: 0.25 }}
                style={{
                  transformOrigin: `${middlewareData.arrow?.x}px top`
                }}
              >
                <FloatingArrow ref={arrowRef} context={context} fill='white' height={8} width={16} />
                {renderPopover}
              </m.div>
            </LazyMotion>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
