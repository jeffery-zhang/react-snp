import React, { useEffect, useRef, useState } from "react"
import { calcPos, calcRect, getComputedRectAndPos, transformRectLimits, getParentRect } from './utils'
import type { FC } from 'react'
import type { SnpProps, ResizeDirectionSet, HandledRectLimits } from './interface'
import styles from './index.css'

export const Snp: FC<SnpProps> = ({
  children,
  bind = 'default',
  style = {},
  className,
  initial = {
    x: 0,
    y: 0,
    w: 100,
    h: 100,
  },
  moveCallbacks,
  resizeCallbacks,
  enableMove = 'both',
  enableResize = 'both',
  boundaries = {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  rectLimits = {
    maxW: 'auto',
    minW: 'auto',
    maxH: 'auto',
    minH: 'auto',
  },
}) => {
  const snpRef = useRef<HTMLDivElement>(null)
  const hasComputed = useRef<boolean>(false)
  const [pos, setPos] = useState<{
    x: number
    y: number
  }>({ x: 0, y: 0 })
  const [rect, setRect] = useState<{
    w: number
    h: number
  }>({ w: 0, h: 0 })
  const [handledRectLimits, setLimits] = useState<HandledRectLimits>({
    minW: 0,
    maxW: 0,
    minH: 0,
    maxH: 0,
  })

  useEffect(() => {
    if (snpRef.current) {
      setPos(() => calcPos(snpRef, bind))
      setRect(() => {
        setLimits(transformRectLimits(snpRef, rectLimits))
        return calcRect(snpRef)
      })
      hasComputed.current = true
    }
  }, [snpRef])

  const onMoveStart = (
    e: React.MouseEvent,
    mode: 'move' | 'resize',
    directionSet?: ResizeDirectionSet,
  ) => {
    e.stopPropagation()
    const { x, y }: { x: number, y: number } = calcPos(snpRef, bind)
    const [mx, my]: [number, number] = [e.clientX, e.clientY]
    const { w, h }: { w: number, h: number } = calcRect(snpRef)
    const parentRect = getParentRect(snpRef)
    mode === 'move' && moveCallbacks?.moveStartCallback?.(x, y)
    mode === 'resize' && resizeCallbacks?.resizeStartCallback?.(w, h)
    console.log(handledRectLimits)

    const handleMouseMove = (e: MouseEvent) => {
      e.preventDefault()
      const computed = getComputedRectAndPos(
        e,
        { x, y },
        { mx, my },
        { w, h },
        parentRect,
        mode,
        mode === 'move' ? enableMove : enableResize,
        { boundaries, handledRectLimits },
        directionSet,
      )
      setPos({
        x: computed.x,
        y: computed.y,
      })
      if (mode === 'resize') {
        setRect({
          w: computed.w,
          h: computed.h,
        })
      }
      mode === 'move' && moveCallbacks?.movingCallback?.(computed.x, computed.y)
      mode === 'resize' && resizeCallbacks?.resizingCallback?.(computed.w, computed.h)
    }
    const handleMouseUp = () => {
      window.removeEventListener('mousemove', handleMouseMove)
      mode === 'move' && moveCallbacks?.moveEndCallback?.(pos.x, pos.y)
      mode === 'resize' && resizeCallbacks?.resizeEndCallback?.(rect.w, rect.h)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
  }

  return <div
    ref={snpRef}
    className={`${styles.snpContainer} ${className}`}
    style={{
      ...style,
      position: bind === 'window' ? 'fixed' : 'absolute',
      left: snpRef.current && hasComputed ? pos.x : initial.x,
      top: snpRef.current && hasComputed ? pos.y : initial.y,
      width: snpRef.current && hasComputed ? rect.w : initial.w,
      height: snpRef.current && hasComputed ? rect.h : initial.h,
    }}
    onMouseDown={e => onMoveStart(e, 'move')}
  >
    {children}
    <div
      className={`${styles.dragger} ${styles.ld}`}
      onMouseDown={e => onMoveStart(e, 'resize', ['left'])}
    ></div>
    <div
      className={`${styles.dragger} ${styles.rd}`}
      onMouseDown={e => onMoveStart(e, 'resize', ['right'])}
    ></div>
    <div
      className={`${styles.dragger} ${styles.td}`}
      onMouseDown={e => onMoveStart(e, 'resize', ['top'])}
    ></div>
    <div
      className={`${styles.dragger} ${styles.bd}`}
      onMouseDown={e => onMoveStart(e, 'resize', ['bottom'])}
    ></div>
    <div
      className={`${styles.dragger} ${styles.ltd}`}
      onMouseDown={e => onMoveStart(e, 'resize', ['left', 'top'])}
    ></div>
    <div
      className={`${styles.dragger} ${styles.rtd}`}
      onMouseDown={e => onMoveStart(e, 'resize', ['right', 'top'])}
    ></div>
    <div
      className={`${styles.dragger} ${styles.lbd}`}
      onMouseDown={e => onMoveStart(e, 'resize', ['left', 'bottom'])}
    ></div>
    <div
      className={`${styles.dragger} ${styles.rbd}`}
      onMouseDown={e => onMoveStart(e, 'resize', ['right', 'bottom'])}
    ></div>
  </div>
}
