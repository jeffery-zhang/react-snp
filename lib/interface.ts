import type { ReactNode, CSSProperties } from "react";

export interface SnpProps {
  children: ReactNode
  bind?: 'window' | 'default'
  style?: CSSProperties
  initial?: InitaialProperties
  className?: string
  moveCallbacks?: MoveCallbacks
  resizeCallbacks?: ResizeCallbacks
  enableMove?: MoveDirectionType
  enableResize?: MoveDirectionType
  boundaries?: BoundariesProperties
  rectLimits?: RectLimitsProperties
}

export interface InitaialProperties {
  x: number | `${number}%` | `${number}px`
  y: number | `${number}%` | `${number}px`
  w: number | `${number}%` | `${number}px`
  h: number | `${number}%` | `${number}px`
}

export interface MoveCallbacks {
  moveStartCallback?: (x: number, y: number) => void
  movingCallback?: (x: number, y: number) => void
  moveEndCallback?: (x: number, y: number) => void
}

export interface ResizeCallbacks {
  resizeStartCallback?: (w: number, h: number) => void
  resizingCallback?: (w: number, h: number) => void
  resizeEndCallback?: (w: number, h: number) => void
}

export type MoveDirectionType = 'horizontal' | 'vertical' | 'both' | 'disabled'

export type ResizeDirection = 'left' | 'right' | 'top' | 'bottom'

export type ResizeDirectionSet = [ResizeDirection] | [ResizeDirection, ResizeDirection]

export type BoundariesProperties = {
  left: number
  right: number
  top: number
  bottom: number
}

export type RectLimitsProperties = {
  minW: number | 'auto'
  maxW: number | 'auto'
  minH: number | 'auto'
  maxH: number | 'auto'
}

export type HandledRectLimits = {
  minW: number
  maxW: number
  minH: number
  maxH: number
}
