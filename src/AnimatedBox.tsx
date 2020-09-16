import React from 'react'

export const AnimatedBox = () => <div>lol</div>
// import React, { useRef, useLayoutEffect, useState, useEffect } from 'react'
// import {computeInverseValues} from './computeInverseValues'
// import {keyframeBuilder} from './keyframeBuilder'

// interface AnimatedBoxProps {
//   style: {[key: string]: string},
//   duration: number,
//   children: React.ReactNode
// }

// const cssAnimationName = `min_sVenja`

// export const AnimatedBox: React.FunctionComponent<AnimatedBoxProps> = ({style, duration, children}) => {
//   const boxRef = useRef<HTMLDivElement>(null)
//   const lastBound = useRef<DOMRect>()
//   const [animationString, setAnimationString] = useState(``)
//   const countRef = useRef<number>(0)
//   useEffect(() => {
//     console.log('effect')
//   },[JSON.stringify(style), children])

//   useLayoutEffect(() => {
//     console.log('layout effect')
//     const boxElement = boxRef.current;
//     const firstBound = boxElement?.getBoundingClientRect()
//     if (lastBound.current && lastBound.current !== firstBound) {
//       const inverseValues = computeInverseValues(firstBound, lastBound.current)
//       console.log(firstBound, lastBound.current)
//       setAnimationString(keyframeBuilder(
//         inverseValues,
//         {translateX:0, translateY: 0, scaleX:1, scaleY:1},
//         cssAnimationName + countRef.current
//       ));
//     }
//     lastBound.current = firstBound;
//     countRef.current += 1;
//   }, [JSON.stringify(style), children])


//   return <>
//     <style>
//       {animationString}
//     </style>
//     <div
//       ref={boxRef}
//       style={{
//         ...style,
//         transformOrigin: `top left`,
//         overflow: `hidden`,
//         [animationString ? `animation` : ``]: `${cssAnimationName+(countRef.current-1)} linear ${duration}s`
//       }}>
//         <div style={{
//           [animationString ? `animation` : ``]: `${cssAnimationName+(countRef.current-1)}_inner linear ${duration}s`
//         }}>
//           {children}

//         </div>
//       </div>
//   </>
// }
