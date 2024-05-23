import { Assets, DestroyOptions, Point, Sprite } from "pixi.js";
import { GameComponents, GameWorld } from "../Scenes/GameScene";
import { Game } from "../../Engine/Game/Game";
import { Bodies, Body } from "matter-js";
import Vector from "victor";
import { ASSET_KEYS } from "../../assets";

export class Player extends Sprite {
  entity: Pick<GameComponents, "controllable" | "drawable">;
  world: GameWorld;
  body: Body;

  constructor(world: GameWorld) {
    super();

    this.world = world;

    this.position = new Point(Game.Dimensions.x / 2, Game.Dimensions.y / 2);
    console.log(Assets.cache);
    this.texture = Assets.get(ASSET_KEYS.cube);
    this.visible = true;

    this.body = Bodies.rectangle(
      this.position.x,
      this.position.y,
      this.texture.width,
      this.texture.height
    );

    this.entity = this.world.add({
      controllable: true,
      drawable: {
        sprite: this,
      },
      position: {
        globalPosition: new Vector(this.position.x, this.position.y),
        localPosition: new Vector(this.position.x, this.position.y),
      },
      physics: this.body,
    });
  }

  destroy(options?: DestroyOptions | undefined): void {
    super.destroy(options);

    this.world.remove(this.entity);
  }
}
