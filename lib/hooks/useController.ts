import { useRef } from 'react'
import type { UseControllerArgs } from '../types/interface'

export const useController = ({
  ref,
  moveCallback,
}: UseControllerArgs) => {
  const cRef = useRef<HTMLDivElement>(null)
  
}