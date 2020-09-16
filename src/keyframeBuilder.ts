import { TransformValues } from './computeInverseValues'

const easingFunction = (a: number):number => 1 - Math.pow(1 - a, 3);

export const keyframeBuilder = (from: TransformValues, to: TransformValues, animationName: string): string => {
  const stepKeyStrings:string[] = []
  const stepKeyStringsInner: string[] = []
  const stepKeyStringsPrevContent: string[] = []
  const stepKeyStringsNextContent: string[] = []

  for (let i = 0; i < 100; i += 1 ) {
    let step = easingFunction(i/100);

    let scaleX = from.scaleX + (to.scaleX - from.scaleX) * step;
    let scaleY = from.scaleY + (to.scaleY - from.scaleY) * step;

    let translateX = from.translateX + (to.translateX - from.translateX) * step;
    let translateY = from.translateY + (to.translateY - from.translateY) * step;

    let opacity = from.opacity + (to.opacity - from.opacity) * step

    stepKeyStrings.push(`
      ${i}% {
        transform: translate(${translateX}px, ${translateY}px) scale(${scaleX}, ${scaleY});
        opacity: ${opacity};
      }
    `)

    stepKeyStringsInner.push(`
      ${i}% {
        transform: scale(${1/scaleX}, ${1/scaleY});
      }
    `)

    let prevContentOpacity = 1 - 1 * step
    stepKeyStringsPrevContent.push(`
      ${i}% {
        opacity: ${prevContentOpacity};
      }
    `)

    let nextContentOpacity = 1 * step
    stepKeyStringsNextContent.push(`
      ${i}% {
        opacity: ${nextContentOpacity};
      }
    `)
  }

  return `
  @keyframes ${animationName} {
    ${stepKeyStrings.join('')}
  }

  @keyframes ${animationName}_inner {
    ${stepKeyStringsInner.join('')}
  }

  @keyframes ${animationName}_prevContent {
    ${stepKeyStringsPrevContent.join('')}
  }

  @keyframes ${animationName}_nextContent {
    ${stepKeyStringsNextContent.join('')}
  }

  `

}