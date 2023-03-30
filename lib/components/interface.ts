import type { ReactNode, CSSProperties } from 'react'

export interface SnpProps extends SnpControllerProps {
  style?: CSSProperties
  defaults?: DefaultProperties
  children: ReactNode
}

export interface DefaultProperties {
  width: number | `${number}px` | `${number}%`
  height: number | `${number}px` | `${number}%`
  x: number | `${number}px` | `${number}%`
  y: number | `${number}px` | `${number}%`
}

export interface SnpControllerProps {
  enableMove?: boolean
  enableResize?: boolean
}
