export type TransformValues = {
  translateX: number,
  translateY: number,
  scaleX: number,
  scaleY: number,
  opacity: number,
}

export type PossibleAnimateValues = {
  height: number;
  width: number;
  x: number;
  y: number;
  opacity: number;
}

export const computeInverseValues = (first?: PossibleAnimateValues, last?: PossibleAnimateValues): TransformValues => {
  if (!first || !last) throw new Error(`no all bound are provided`);

  return {
    translateX: last.x - first.x,
    translateY: last.y - first.y,
    scaleX: Math.max(last.width, 0.001) / Math.max(first.width, 0.001),
    scaleY: Math.max(last.height, 0.001) / Math.max(first.height, 0.001),
    opacity: last.opacity
  }
}
