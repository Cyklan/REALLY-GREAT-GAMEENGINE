import { GameWorld } from "../../../Game/Scenes/GameScene";

export function playerPhysicsSystem(world: GameWorld) {
  const player = world.with("controllable", "physics", "position");
  return function () {
    for (const { physics, position } of player) {
      position.globalPosition.x = physics.position.x;
      position.globalPosition.y = physics.position.y;
    }
  };
}
