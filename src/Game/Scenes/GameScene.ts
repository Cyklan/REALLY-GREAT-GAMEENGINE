import { World } from "miniplex";
import { Scene } from "../../Engine/Scene/Scene";
import { Container, DestroyOptions, Sprite } from "pixi.js";
import { Player } from "../Models/Player";
import { movementSystem } from "../../Engine/ECS/Systems/movementSystem";
import { RoomManager } from "../Models/RoomManager";
import { roomChangeSystem } from "../../Engine/ECS/Systems/roomChangeSystem";
import { Tween } from "@tweenjs/tween.js";
import { Physics } from "../../Engine/Physics/Physics";
import { type Body } from "matter-js";
// import { playerPhysicsSystem } from "../../Engine/ECS/Systems/playerPhysicsSystem"
import Vector from "victor";
import { localPositionSystem } from "../../Engine/ECS/Systems/localPositionSystem";
import { spritePositionSystem } from "../../Engine/ECS/Systems/spritePositionSystem";

export type GameComponents = Partial<{
  controllable: boolean;
  drawable: {
    sprite: Sprite;
  };

  position: {
    localPosition: Vector;
    globalPosition: Vector;
  };

  roomManager: RoomManager;
  tween: Tween<any>;
  physics: Body;
}>;

export type GameWorld = World<GameComponents>;
export class GameScene extends Container implements Scene<GameComponents> {
  world: GameWorld;
  systems: (() => void)[] = [];
  roomManager: RoomManager;

  physics: Physics = new Physics();

  constructor() {
    super();
    this.world = new World<GameComponents>();

    this.roomManager = new RoomManager(this);
    const player = new Player(this.world);
    this.addChild(player);
    this.systems.push(roomChangeSystem(this.world));
    this.systems.push(localPositionSystem(this.world));
    this.systems.push(spritePositionSystem(this.world));
    // this.systems.push(playerPhysicsSystem(this.world));
    this.systems.push(movementSystem(this.world));

    this.physics.addBodies(player.body);
  }

  update() {
    for (const system of this.systems) {
      system();
    }

    this.roomManager.update();
    this.physics.update();
  }

  destroy(options?: DestroyOptions | undefined): void {
    super.destroy(options);
  }
}
