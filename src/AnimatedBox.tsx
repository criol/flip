import React, { useRef, useLayoutEffect } from 'react'
import {computeInverseValues} from './computeInverseValues'
import {keyframeBuilder} from './keyframeBuilder'
export enum SizeEnum {
  small = `Small`,
  big = `Big`
}

interface AnimatedBoxProps {
  size: SizeEnum
}
const pixelMap: {[key: string]: number} = {
  [SizeEnum.small]: 10,
  [SizeEnum.big]: 200,
}

export const AnimatedBox: React.FunctionComponent<AnimatedBoxProps> = ({size}: AnimatedBoxProps) => {
  const pixels = pixelMap[size];
  const boxRef = useRef<HTMLDivElement>(null)
  const lastBound = useRef<DOMRect>()

  useLayoutEffect(() => {
    const boxElement = boxRef.current;
    const firstBound = boxElement?.getBoundingClientRect()
    if (lastBound.current) {
      const inverseValues = computeInverseValues(firstBound, lastBound.current)
      console.log(keyframeBuilder(
        inverseValues,
        {translateX:0, translateY: 0, scaleX:0, scaleY:0}
      ))
    }
    lastBound.current = firstBound;
  }, [size])


  return <div style={{
    width: `300px`,
    height: `300px`,
    display: `flex`,
    justifyContent: size === SizeEnum.small ? 'flex-start': 'flex-end'
  }}>
      <div
        ref={boxRef}
        style={{
          width: `${pixels}px`,
          height: `${pixels}px`,
          background: `red`,
        }}>
          <div>sad</div>
        </div>
  </div>
}
