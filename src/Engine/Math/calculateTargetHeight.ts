import { Point } from "pixi.js";

export function calculateTargetHeight(aspectRatio: Point, width: number) {
  return (aspectRatio.y / aspectRatio.x) * width;
}
