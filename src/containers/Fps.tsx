import * as React from 'react'
// import { Entity } from './Entity'
import styled from 'styled-components'
import { FrameContext } from './FrameProvider'

export const Fps: React.FC = props => {
  const frame: number = React.useContext(FrameContext)

  return (
    <text x="0" y="35" font-family="Verdana" font-size="14">
        {frame}
    </text>
  )
}