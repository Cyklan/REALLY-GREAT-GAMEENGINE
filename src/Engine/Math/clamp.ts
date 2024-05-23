export function clamp(min: number, actual: number, max: number) {
  return Math.min(Math.max(actual, min), max);
}
