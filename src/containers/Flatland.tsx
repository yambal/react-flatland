import * as React from 'react'
import { AssetProvider } from '../Provider/AssetProvider'
import { FrameProvider } from '../Provider/FrameProvider'
import { Fps } from './Fps'
import { DefPortalContainer } from './Portal/DefPortalContainer'

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
          <DefPortalContainer />
          {props.children}
          <Fps />
        </svg>
      </FrameProvider>
    </AssetProvider>
  )
}