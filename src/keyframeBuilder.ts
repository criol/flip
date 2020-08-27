import { TransformValues } from './computeInverseValues'

const easingFunction = (a: number):number => 1 - Math.pow(1 - a, 3);

export const keyframeBuilder = (from: TransformValues, to: TransformValues): string => {
  const stepKeyStrings:string[] = []
  for (let i = 0; i < 100; i += 1 ) {
    let ease = easingFunction(i/100);

    let scaleX = Math.floor(to.scaleX + (from.scaleX) * ease);

    let scaleY = Math.floor(to.scaleY + (from.scaleY) * ease);
    let translateX = Math.floor(to.translateX + (from.translateX) * ease);
    let translateY = Math.floor(to.translateY + (from.translateY) * ease);

    stepKeyStrings.push(`
      ${i}% {
        transform: scale(${scaleX}, ${scaleY}) translate(${translateX}px, ${translateY}px)
      }
    `)
  }
  return `@keyframes animatedBox {
    ${stepKeyStrings.join('')}
  }`

}