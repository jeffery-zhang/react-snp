import React, { useCallback, useEffect, useRef } from 'react'
import { useController } from '../hooks/useController'
import { SnpController } from './SnpController'
import styles from './style.css'
import type { FC } from 'react'
import type { SnpProps } from '../types/interface'

export const Snp: FC<SnpProps> = ({
  children = null,
  className,
  style,
  defaults,
  enableMove = true,
  enableResize = true,
  moveLimit = {},
  moveCallback,
}) => {
  const snpRef = useRef<HTMLDivElement>(null)
  const controllerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    useController(snpRef)
  }, [])

  return <div
    ref={snpRef}
    className={`${styles.snpContainer} ${className}`}
    style={{
      ...style,
      ...defaults,
      left: defaults.x,
      top: defaults.y,
    }}
  >
    {children}
    <SnpController
      ref={controllerRef}
      enableMove={enableMove}
      enableResize={enableResize}
    />
  </div>
}