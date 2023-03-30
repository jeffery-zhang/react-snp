import React, { useEffect, useRef } from 'react'
import { SnpController } from './SnpController'
import styles from './style.css'
import type { FC } from 'react'
import type { SnpProps } from './interface'

export const Snp: FC<SnpProps> = ({
  style,
  defaults,
  enableMove = true,
  enableResize = true,
  children = null,
}) => {
  const snpRef = useRef<HTMLDivElement>(null)

  return <div
    ref={snpRef}
    className={styles.snpContainer}
    style={{
      ...style,
      ...defaults,
      left: defaults.x,
      top: defaults.y,
    }}
  >
    {children}
    <SnpController
      enableMove={enableMove}
      enableResize={enableResize}
    />
  </div>
}