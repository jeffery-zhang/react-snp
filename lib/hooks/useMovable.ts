import type { UseMovableParams } from '../types/interface'

export const useMovable = ({
  ref,
  callback,
  endCallback,
}: UseMovableParams) => {
  if (!ref.current) return

  let [initX, initY] = [0, 0]

  const handleMouseDown = (e: MouseEvent) => {
    e.stopPropagation()
    initX = e.clientX
    initY = e.clientY
    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseup', handleMouseUp)
  }

  const handleMouseMove = (e: MouseEvent) => {
    e.preventDefault()
    callback(e.clientX - initX, e.clientY - initY)
  }

  const handleMouseUp = () => {
    window.removeEventListener('mousemove', handleMouseMove)
    window.removeEventListener('mouseup', handleMouseUp)
    endCallback()
  }

  ref.current.addEventListener('mousedown', handleMouseDown)

}
