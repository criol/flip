export type TransformValues = {
  translateX: number,
  translateY: number,
  scaleX: number,
  scaleY: number
}

export const computeInverseValues = (first?: DOMRect, last?: DOMRect): TransformValues => {
  if (!first || !last) throw new Error(`no all bound are provided`);

  return {
    translateX: first.x - last.x,
    translateY: first.y - last.y,
    scaleX: first.width / last.width,
    scaleY: first.height / last.height
  }
}
