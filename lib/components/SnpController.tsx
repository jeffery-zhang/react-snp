import React from 'react'
import styles from './style.css'
import type { FC } from 'react'
import type { SnpControllerProps } from './interface'

export const SnpController: FC<SnpControllerProps> = ({
  enableMove = true,
  enableResize = true,
}) => {
  return <div
    className={styles.controllerContainer}
  >
    <div className={`${styles.controllers} ${styles.topController}`}></div>
    <div className={`${styles.controllers} ${styles.bottomController}`}></div>
    <div className={`${styles.controllers} ${styles.leftController}`}></div>
    <div className={`${styles.controllers} ${styles.rightController}`}></div>
    <div className={`${styles.controllers} ${styles.topLeftController}`}></div>
    <div className={`${styles.controllers} ${styles.topRightController}`}></div>
    <div className={`${styles.controllers} ${styles.bottomLeftController}`}></div>
    <div className={`${styles.controllers} ${styles.bottomRightController}`}></div>
  </div>
}
