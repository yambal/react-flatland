import * as React from 'react'

interface iFrameProvider {
  fps?: number
}

export const FrameContext = React.createContext<number>(0);

export const FrameProvider: React.FC<iFrameProvider> = props => {
  const { fps = 15 } = props

  const [frameTime, setFrameTime] = React.useState(1000 / fps)
  const [requestId, setRequestId] = React.useState(0)
  const [timeStamp, setTimeStamp] = React.useState(0)
  const [frame, setFrame] = React.useState(0)

  React.useEffect(
    () => {
      setFrameTime(1000 / fps)
    },
    [fps]
  )

  const step = React.useCallback(
    (_timeStamp: number) => {
      setTimeStamp(_timeStamp)
      const nextframe = Math.floor(_timeStamp / frameTime)
      if (frame !== nextframe) {
        setFrame(nextframe)
      }

      setRequestId(requestAnimationFrame(step))
    },
    [frame, timeStamp, frameTime]
  )

  React.useEffect(
    () => {
      setFrameTime(1000 / fps)
      setRequestId(requestAnimationFrame(step))
      return () => {
        cancelAnimationFrame(requestId)
      }
    },
    []
  )

  return (
    <FrameContext.Provider value={frame}>
      {props.children}
    </FrameContext.Provider>
  )
}