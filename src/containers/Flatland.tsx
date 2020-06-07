import * as React from 'react'
import { AssetProvider } from './AssetProvider'
import { FrameProvider } from './FrameProvider'
import { Fps } from './Fps'

export interface iFlatland {
  width?: number
  height?: number
  assets?: string[]
  fps?: number
}

interface iAsset {
  key: string
  url: string
}

export const FlatLand: React.FC<iFlatland> = props => {
  const {
    width = 480,
    height = 480,
    assets = [],
    fps = 15
  } = props

  return (
    <AssetProvider assets={assets}>
      <FrameProvider fps={fps}>
        <svg
          width={width}
          height={height}
          viewBox={`0 0 ${width} ${height}`}
        >
          
          {props.children}
          <Fps />
        </svg>
      </FrameProvider>
    </AssetProvider>
  )
}