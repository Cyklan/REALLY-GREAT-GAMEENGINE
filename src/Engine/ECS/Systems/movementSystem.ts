import { GameWorld } from "../../../Game/Scenes/GameScene";
import { InputController } from "../../Input/InputController";
import { timeManager } from "../../Time/TimeManager";

export function movementSystem(world: GameWorld) {
  const controllables = world.with("controllable", "position");

  const speed = 100;

  return function () {
    for (const { position } of controllables) {
      position.globalPosition.x +=
        InputController.direction.x * speed * timeManager.delta;
      position.globalPosition.y +=
        InputController.direction.y * speed * timeManager.delta;
    }
  };
}
