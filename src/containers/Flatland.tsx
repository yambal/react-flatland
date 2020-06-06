import * as React from 'react'
import { AssetProvider } from './AssetProvider'

interface iFlatland {
  width?: number
  height?: number
  assets?: string[]
}

interface iAsset {
  key: string
  url: string
}

export const FlatLand: React.FC<iFlatland> = props => {
  const { width = 480, height = 480, assets = [] } = props

  return (
    <AssetProvider assets={assets}>
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
      >
        {props.children}
      </svg>
    </AssetProvider>
  )
}