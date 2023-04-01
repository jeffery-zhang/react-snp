import type { RefObject } from 'react'
import type { SnpProps, ResizeDirectionSet, BoundariesProperties, MoveDirectionType, RectLimitsProperties, HandledRectLimits } from './interface'

/**
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

/**
 * @description 获取最近的定位元素宽高
 * @param {RefObject<HTMLElement>} ref
 * @returns {{ w: number, h: number }}
 */
export const getParentRect = (ref: RefObject<HTMLElement>): { w: number, h: number } => {
  let [w, h]: [number, number] = [0, 0]
  if (ref.current) {
    const isFixed = ref.current?.style.position === 'fixed'  

    if (isFixed) {
      w = window.innerWidth
      h = window.innerHeight
    } else {
      let ancestor = ref.current.offsetParent as HTMLElement | null
      while (ancestor && window.getComputedStyle(ancestor).position === 'static') {
        ancestor = ancestor.offsetParent as HTMLElement | null
      }
      if (ancestor) {
        w = ancestor.offsetWidth
        h = ancestor.offsetHeight
      }
    }
  }
  return { w, h }
}

/**
 * @description 计算纯数字的元素宽高限制
 * @param {RefObject<HTMLElement>} ref
 * @param {RectLimitsProperties} rectLimits
 * @returns {HandledRectLimits}
 */
export const transformRectLimits = (ref: RefObject<HTMLElement>, rectLimits: RectLimitsProperties): HandledRectLimits => {
  let [ minW, maxW, minH, maxH ]: [number, number, number, number] = [0, 0, 0, 0]

  if (ref.current) {
    minW = rectLimits.minW === 'auto' ? ref.current.getBoundingClientRect().width : rectLimits.minW
    minH = rectLimits.minH === 'auto' ? ref.current.getBoundingClientRect().height : rectLimits.minH
    maxW = rectLimits.maxW === 'auto' ? getParentRect(ref).w : rectLimits.maxW
    maxH = rectLimits.maxH === 'auto' ? getParentRect(ref).h : rectLimits.maxH
  }

  return {
    minW, maxW, minH, maxH
  }
}

/**
 * @description 计算鼠标拖动元素宽高时的几何属性
 * @param {MouseEvent} e
 * @param {{ x: number, y: number }} initPos
 * @param {{ x: number, y: number }} initMPos
 * @param {{ w: number, h: number }} initRect
 * @param {{ w: number, h: number }} parentRect
 * @param {'move' | 'resize'} mode
 * @param {MoveDirectionType} moveDirection
 * @param {{ boundaries: BoundariesProperties, rectLimits: RectLimitsProperties }} limits
 * @param {ResizeDirectionSet} directionSet
 * @returns {{ x: number, y: number, w: number, h: number }}
 */
export const getComputedRectAndPos = (
  e: MouseEvent,
  initPos: { x: number, y: number },
  initMPos: { mx: number, my: number },
  initRect: { w: number, h: number },
  parentRect: { w: number, h: number },
  mode: 'move' | 'resize',
  moveDirection: MoveDirectionType,
  limits: {
    boundaries?: BoundariesProperties,
    handledRectLimits?: HandledRectLimits,
  },
  directionSet?: ResizeDirectionSet
): { x: number, y: number, w: number, h: number } => {
  let [x, y] = [initPos.x, initPos.y]
  let [w, h] = [initRect.w, initRect.h]

  if (mode === 'move' && limits.boundaries) {
    const { boundaries: b } = limits
    x = ['both', 'horizontal'].includes(moveDirection) ?
      getMiddleValue([b.left, initPos.x + (e.clientX - initMPos.mx), parentRect.w - initRect.w - b.right]) :
      initPos.x
    y = ['both', 'vertical'].includes(moveDirection) ?
      getMiddleValue([b.top, initPos.y + (e.clientY - initMPos.my), parentRect.h - initRect.h - b.bottom]) :
      initPos.y
  }

  if (mode === 'resize' && limits.handledRectLimits && directionSet) {
    const { handledRectLimits: r } = limits
  
    if (directionSet.includes('left') && ['horizontal', 'both'].includes(moveDirection)) {
      x = getMiddleValue([initRect.w + initPos.x - r.maxW, initPos.x + (e.clientX - initMPos.mx), initRect.w + initPos.x - r.minW])
      w = getMiddleValue([r.minW, initRect.w - (e.clientX - initMPos.mx), r.maxW])
    } 
    if (directionSet.includes('top') && ['vertical', 'both'].includes(moveDirection)) {
      y = getMiddleValue([initRect.h + initPos.y - r.maxH, initPos.y + (e.clientY - initMPos.my), initRect.h + initPos.y - r.minH])
      h = getMiddleValue([r.minH, initRect.h - (e.clientY - initMPos.my), r.maxH])
    }
    if (directionSet.includes('right') && ['horizontal', 'both'].includes(moveDirection)) w = getMiddleValue([r.minW, initRect.w + (e.clientX - initMPos.mx), r.maxW])
    if (directionSet.includes('bottom') && ['vertical', 'both'].includes(moveDirection)) h = getMiddleValue([r.minH, initRect.h + (e.clientY - initMPos.my), r.maxH])
  }
  
  return {
    x, y, w, h,
  }
}

/**
 * @description 返回由3个数字组成的数组的中间大小的值
 * @param {[number, number, number]} values
 * @returns {number}
 */
export const getMiddleValue = (values: [number, number, number]): number => {
  values.sort((a, b) => a - b)
  return values[1]
}
