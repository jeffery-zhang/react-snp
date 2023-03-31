import type { RefObject } from 'react'
import type { SnpProps } from './interface'

/**
 * @function calcPos
 * @description 根据元素的样式计算元素的纯数字位置值
 * @param {RefObject<HTMLElement>} ref
 * @param {'window' | 'default'} bind
 * @returns {{ x: number, y: number }}
 */
export const calcPos = (ref: RefObject<HTMLElement>, bind: SnpProps['bind']): {
  x: number
  y: number
} => {
  if (bind === 'default') {
    return {
      x: ref.current?.offsetLeft ?? 0,
      y: ref.current?.offsetTop ?? 0,
    }
  }
  if (bind === 'window') {
    return {
      x: ref.current?.getBoundingClientRect().left ?? 0,
      y: ref.current?.getBoundingClientRect().top ?? 0,
    }
  }
}

/**
 * @function calcRect
 * @description 根据元素的样式计算元素的纯数字宽高值
 * @param {RefObject<HTMLElement>} ref
 * @returns {{ w: number, h: number }}
 */
export const calcRect = (ref: RefObject<HTMLElement>): {
  w: number
  h: number
} => {
  return {
    w: ref.current?.getBoundingClientRect().width ?? 0,
    h: ref.current?.getBoundingClientRect().height ?? 0,
  }
}
