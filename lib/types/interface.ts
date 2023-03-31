import type { ReactNode, CSSProperties, RefObject } from 'react'

export interface SnpProps {
  children: ReactNode
  className?: string
  style?: CSSProperties
  defaults?: DefaultProperties
  enableMove?: boolean
  enableResize?: boolean
  moveLimit?: MoveLimitProperties
  moveCallback?: MoveCallback
}

export interface DefaultProperties {
  width?: number | `${number}px` | `${number}%`
  height?: number | `${number}px` | `${number}%`
  x?: number | `${number}px` | `${number}%`
  y?: number | `${number}px` | `${number}%`
}

export interface MoveLimitProperties {
  left?: number
  right?: number
  top?: number
  bottom?: number
}

export interface SnpControllerProps {
  ref: RefObject<HTMLDivElement>
}

export interface UseControllerArgs {
  ref: RefObject<HTMLDivElement>
  moveCallback: MoveCallback
}

export interface MoveCallback {
  moveStartCallback: MoveStartCallback
  movingCallback: MovingCallback
  moveEndCallback: MoveEndCallback
}

export interface UseMovableParams {
  ref: RefObject<HTMLDivElement>
  callback: MovingCallback
  endCallback: MoveEndCallback
}

export type MoveStartCallback = () => void

export type MovingCallback = (x: number, y: number) => void

export type MoveEndCallback = () => void
