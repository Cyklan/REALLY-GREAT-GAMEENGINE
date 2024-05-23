import { GameWorld } from "../../../Game/Scenes/GameScene";

export function spritePositionSystem(world: GameWorld) {
  const drawables = world.with("drawable", "position");

  return function () {
    for (const { drawable, position } of drawables) {
      drawable.sprite.position = position.localPosition;
    }
  };
}
