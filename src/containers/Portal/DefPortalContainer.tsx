import * as React from 'react'
export const DEF_CONTAINER_ID = 'def-root'

export const DefPortalContainer: React.FC = () => {
  return (
    <defs id={DEF_CONTAINER_ID}/>
  )
}