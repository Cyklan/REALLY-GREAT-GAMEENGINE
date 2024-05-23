import Vector from "victor";
import { Game } from "./Game";

export function convertGlobalToLocalPosition(globalPosition: Vector) {
  const localPosition = new Vector(
    globalPosition.x % Game.Dimensions.x,
    globalPosition.y % Game.Dimensions.y
  );

  return localPosition;
}

/**
 * The rooms are basically a 2d grid, starting with (0, 0) in the top left and moving along
 */
export function convertGlobalPositionToRoomID(globalPosition: Vector) {
  return new Vector(
    Math.floor(globalPosition.x / Game.Dimensions.x),
    Math.floor(globalPosition.y / Game.Dimensions.y)
  );
}
