import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { DEF_CONTAINER_ID } from './DefPortalContainer'

// ==================================================================
interface iMaskPortal {
  id: string
}

export const ClipPathPortal: React.FC<iMaskPortal> = props => {
  const { id } = props
  const [element, setElement] = React.useState(
    () => {
      //const el = document.createElement('clipPath')
      const el =  document.createElementNS("http://www.w3.org/2000/svg", 'clipPath')  // SVG
      el.id = id
      return el
    }
  )
  const [modalRoot, setModalRoot] = React.useState<HTMLElement>()

  React.useEffect(
    () => {
      const defContainerElement = document.getElementById(DEF_CONTAINER_ID)
      if (defContainerElement) {
        setModalRoot(defContainerElement)
        defContainerElement.appendChild(element)
      }
      return () => {
        if (modalRoot) {
          modalRoot.removeChild(element)
        }
      }
    },
    []
  )

  return ReactDOM.createPortal(
    props.children,
    element,
  )
}