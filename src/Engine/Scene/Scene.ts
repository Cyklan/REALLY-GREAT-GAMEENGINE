import { World } from "miniplex";
import { Container } from "pixi.js";

export interface Scene<T extends object> extends Container {
  world: World<T>;
  update: () => void;
  systems: (() => void)[];
}
