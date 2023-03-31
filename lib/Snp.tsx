import React, { useEffect, useRef, useState } from "react"
import { calcPos, calcRect } from './utils'
import type { FC, MouseEventHandler } from 'react'
import type { SnpProps } from './interface'
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
  enableMove = 'both',
  enableResize = 'both',
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

  useEffect(() => {
    if (snpRef.current) {
      setPos(() => calcPos(snpRef, bind))
      setRect(() => calcRect(snpRef))
      hasComputed.current = true
    }
  }, [snpRef])

  const onMoveStart: MouseEventHandler<HTMLDivElement> = e => {
    e.stopPropagation()
    const { x, y }: { x: number, y: number } = calcPos(snpRef, bind)
    const [mx, my]: [number, number] = [e.clientX, e.clientY]
    moveCallbacks?.moveStartCallback?.()

    const handleMouseMove = (e: MouseEvent) => {
      e.preventDefault()
      setPos({
        x: enableMove === 'both' || enableMove === 'horizontal' ? x + (e.clientX - mx) : x,
        y: enableMove === 'both' || enableMove === 'vertical' ? y + (e.clientY - my) : y,
      })
      moveCallbacks?.movingCallback?.()
    }
    const handleMouseUp = () => {
      window.removeEventListener('mousemove', handleMouseMove)
      moveCallbacks?.moveEndCallback?.()
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
    onMouseDown={onMoveStart}
  >
    {children}
    <div
      className={`${styles.dragger} ${styles.ld}`}
    ></div>
    <div
      className={`${styles.dragger} ${styles.rd}`}
    ></div>
    <div
      className={`${styles.dragger} ${styles.td}`}
    ></div>
    <div
      className={`${styles.dragger} ${styles.bd}`}
    ></div>
    <div
      className={`${styles.dragger} ${styles.ltd}`}
    ></div>
    <div
      className={`${styles.dragger} ${styles.rtd}`}
    ></div>
    <div
      className={`${styles.dragger} ${styles.lbd}`}
    ></div>
    <div
      className={`${styles.dragger} ${styles.rbd}`}
    ></div>
  </div>
}
