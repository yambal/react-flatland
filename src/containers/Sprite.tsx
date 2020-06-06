import * as React from 'react'
// import { Entity } from './Entity'
import styled from 'styled-components'
import { AssetContext } from './AssetProvider'

interface iSprite{
  x?: number
  y?:number
  width?: number
  height?: number
  url: string
  frame?: number
}

interface iSpriteImage {
  clipWidth: number
  clipHeight: number
  clipLeft: number
  clipTop: number
}
const _Sprite = styled.image<iSpriteImage>`
  clip-path: polygon(
    ${props => props.clipLeft}px ${props => props.clipTop}px,
    ${props => props.clipLeft + props.clipWidth}px ${props => props.clipTop}px,
    ${props => props.clipLeft + props.clipWidth}px ${props => props.clipTop + props.clipHeight}px,
    ${props => props.clipLeft}px ${props => props.clipTop + props.clipHeight}px
  )
`

interface iAssetFrameMatrix {
  x: number
  y: number
}

export const Sprite: React.FC<iSprite> = props => {
  const assets = React.useContext(AssetContext)
  const { x = 0, y = 0, width = 32, height = 32, url, frame = 0 } = props

  const [assetUrl, setAssetUrl] = React.useState('')
  const [assetWidth, setAssetWidth] = React.useState(width)
  const [assetHeight, setAssetHeight] = React.useState(height)
  const [assetFrameMatrix, setAssetFrameMatrix] = React.useState<iAssetFrameMatrix[]>([])
  const [clipLeft, setClipLeft] = React.useState<number>(0)
  const [clipTop, setClipTop] = React.useState<number>(0)

  React.useEffect(
    () => {
      const asset = assets.find(
        (asseta) => {
          return asseta.key === url
        }
      )
      if (asset && assetUrl !== asset.url){
        setAssetWidth(asset.width)
        setAssetHeight(asset.height)
        const matrixies: iAssetFrameMatrix[] = []
        for (let y = 0; y < Math.floor(asset.height / height); y++) {
          for (let x = 0; x < Math.floor(asset.width / width); x++) {
            const matrix: iAssetFrameMatrix = {
              x: x * width,
              y: y * width
            }
            matrixies.push(matrix)
          }
        }
        setAssetFrameMatrix(matrixies)
        setAssetUrl(asset.url)
      }
    },
    [url, assets, width, height]
  )

  React.useEffect(
    () => {
      const matrix = assetFrameMatrix[frame]
      if (matrix) {
        setClipLeft(assetFrameMatrix[frame].x)
        setClipTop(assetFrameMatrix[frame].y)
      }
    },
    [assetFrameMatrix, frame]
  )

  return (
    <_Sprite
      width={assetWidth}
      height={assetHeight}
      clipHeight={width}
      clipWidth={height}
      clipLeft={clipLeft}
      clipTop={clipTop}
      x={x-clipLeft}
      y={y-clipTop}
      xlinkHref={assetUrl}
    />
  )
}