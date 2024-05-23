import { Assets, Container, Point, Text } from "pixi.js";
import { Scene } from "../Scene/Scene";
import { World } from "miniplex";
import { assets } from "../../assets";
import { Game } from "./Game";
import { GameScene } from "../../Game/Scenes/GameScene";

export type LoadingComponents = Partial<{}>;

export class LoadingScreen
  extends Container
  implements Scene<LoadingComponents>
{
  world: World<{}>;
  systems: (() => void)[];
  percentageLoader: Text;

  constructor() {
    super();
    this.world = new World();
    this.systems = [];
    this.percentageLoader = new Text({
      text: "0%",
    });
    this.updatePercentageLoader(0);

    this.addAssets();
    this.loadAssets();
  }

  updatePercentageLoader(progress: number) {
    this.percentageLoader.text = `${Math.floor(progress * 100)}%`;
    this.percentageLoader.position = new Point(
      Game.Dimensions.x - 16 - this.percentageLoader.width,
      Game.Dimensions.y - 16
    );
  }

  async loadAssets() {
    console.log(assets.map((asset) => asset.alias));
    await Assets.load(assets.map((asset) => asset.alias));
    Game.changeScene(GameScene);
  }

  addAssets() {
    for (const asset of assets) {
      console.log(asset);
      Assets.add(asset);
    }

    console.log(Assets);
  }

  update() {
    for (const system of this.systems) {
      system();
    }
  }
}
