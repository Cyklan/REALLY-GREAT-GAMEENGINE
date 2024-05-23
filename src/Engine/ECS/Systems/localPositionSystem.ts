import { GameWorld } from "../../../Game/Scenes/GameScene";
import { convertGlobalToLocalPosition } from "../../Game/Position";

export function localPositionSystem(world: GameWorld) {
  const positions = world.with("position");

  return function () {
    for (const { position } of positions) {
      position.localPosition = convertGlobalToLocalPosition(
        position.globalPosition
      );
    }
  };
}
