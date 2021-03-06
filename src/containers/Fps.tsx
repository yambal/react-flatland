import * as React from 'react'
// import { Entity } from './Entity'
import styled from 'styled-components'
import { FrameContext } from '../Provider/FrameProvider'

export const Fps: React.FC = props => {
  const frame: number = React.useContext(FrameContext)

  return (
    <text x="0" y="35" fontSize="14">
        {frame}
    </text>
  )
}