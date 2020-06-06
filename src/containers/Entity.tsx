import * as React from 'react'
import styled from 'styled-components'

interface iEntity extends React.SVGProps<SVGGElement>{
  width?: number
  height?: number 
}


const _Entity = styled.g<iEntity>`
  /* clip-path: polygon(0 0, ${props => props.width}px 0, ${props => props.width}px ${props => props.height}px, 0 ${props => props.height}px); */
`

export const Entity: React.FC<iEntity> = props => {
  const { x = 0, y = 0, width = 32, height = 32, className = 'entity' } = props
  return (
    <_Entity
      x={x}
      y={y}
      width={width}
      height={height}
      className={className}
    >
      {props.children}
    </_Entity>
  )
}