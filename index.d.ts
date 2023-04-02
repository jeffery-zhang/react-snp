import type { Component } from 'react'

import type { SnpProps } from './lib/interface'

export type {
  SnpProps,
  InitaialProperties,
  MoveCallbacks,
  ResizeCallbacks,
  MoveDirectionType,
  BoundariesProperties,
  RectLimitsProperties,
} from './lib/interface'

export declare const Snp: Component<SnpProps>
