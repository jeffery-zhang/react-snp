import React, { memo, useEffect, useRef, forwardRef } from 'react'
import styles from './style.css'
import type { FC } from 'react'
import type { SnpControllerProps } from '../types/interface'

export const SnpController: FC<SnpControllerProps> = memo(forwardRef(({}, ref) => {
  const mainRef = useRef<HTMLDivElement>(null)
  const tRef = useRef<HTMLDivElement>(null)
  const bRef = useRef<HTMLDivElement>(null)
  const lRef = useRef<HTMLDivElement>(null)
  const rRef = useRef<HTMLDivElement>(null)
  const tlRef = useRef<HTMLDivElement>(null)
  const trRef = useRef<HTMLDivElement>(null)
  const blRef = useRef<HTMLDivElement>(null)
  const brRef = useRef<HTMLDivElement>(null)

  return <div
    className={styles.controllerContainer}
    ref={mainRef}
  >
    <div
      className={`${styles.controllers} ${styles.topController}`}
      ref={tRef}
    ></div>
    <div
      className={`${styles.controllers} ${styles.bottomController}`}
      ref={bRef}
    ></div>
    <div
      className={`${styles.controllers} ${styles.leftController}`}
      ref={lRef}
    ></div>
    <div
      className={`${styles.controllers} ${styles.rightController}`}
      ref={rRef}
    ></div>
    <div
      className={`${styles.controllers} ${styles.topLeftController}`}
      ref={tlRef}
    ></div>
    <div
      className={`${styles.controllers} ${styles.topRightController}`}
      ref={trRef}
    ></div>
    <div
      className={`${styles.controllers} ${styles.bottomLeftController}`}
      ref={blRef}
    ></div>
    <div
      className={`${styles.controllers} ${styles.bottomRightController}`}
      ref={brRef}
    ></div>
  </div>
}))
