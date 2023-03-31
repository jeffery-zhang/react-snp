import type { ReactNode, CSSProperties } from "react";

export interface SnpProps {
  children: ReactNode
  bind?: 'window' | 'default'
  style?: CSSProperties
  initial?: InitaialProperties
  className?: string
  moveCallbacks?: MoveCallbacks
  enableMove?: 'horizontal' | 'vertical' | 'both' | 'disabled'
  enableResize?: 'horizontal' | 'vertical' | 'both' | 'disabled'
}

export interface InitaialProperties {
  x: number | `${number}%` | `${number}px`
  y: number | `${number}%` | `${number}px`
  w: number | `${number}%` | `${number}px`
  h: number | `${number}%` | `${number}px`
}

export interface MoveCallbacks {
  moveStartCallback?: () => void
  movingCallback?: () => void
  moveEndCallback?: () => void
}
