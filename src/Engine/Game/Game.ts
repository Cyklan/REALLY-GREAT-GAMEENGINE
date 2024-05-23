import { Application, Assets, Point } from "pixi.js";
import { Scene } from "../Scene/Scene";
import { timeManager } from "../Time/TimeManager";
import cube from "../../assets/cube.png";
import { InputController } from "../Input/InputController";
import { calculateTargetHeight } from "../Math/calculateTargetHeight";
import { LoadingScreen } from "./LoadingScene";

export type Class<T> = { new (...args: any[]): T };

export class Game {
  public static app: Application;
  private static currentScene: Scene<any>;

  public static readonly AspectRatio: Point = new Point(16, 9);

  public static Dimensions: Point = new Point(576, 324);

  private constructor() {
    // just static, no constructor
  }

  static async loadAssets() {
    Assets.add({ alias: "cube", src: cube });
    await Assets.load("cube");
  }

  static async initialize() {
    InputController.init();
    const app = new Application();
    await app.init({
      width: Game.Dimensions.x,
      height: Game.Dimensions.y,
    });
    // await Game.loadAssets();
    console.log(cube);

    app.canvas.id = "game";
    document.body.appendChild(app.canvas);

    window.addEventListener("resize", Game.resize);

    app.ticker.add(this.update);

    Game.app = app;
    Game.changeScene(LoadingScreen);
    Game.resize();
  }

  public static changeScene(newScene: Class<Scene<any>>, ...args: any[]) {
    let scale = new Point(1, 1);
    if (Game.currentScene) {
      scale = Game.currentScene.scale;
      Game.app.stage.removeChild(Game.currentScene);
      Game.currentScene.destroy();
    }

    Game.currentScene = new newScene(args);
    Game.currentScene.scale = scale;
    Game.app.stage.addChild(Game.currentScene);
  }

  private static update() {
    timeManager.update();

    Game.currentScene?.update();
  }

  // TODO: do calculation with smaller dimension, not just always width
  private static resize() {
    let width = window.innerWidth;
    let height = calculateTargetHeight(Game.AspectRatio, width);

    while (height % 1 !== 0) {
      height = calculateTargetHeight(Game.AspectRatio, --width);
    }

    Game.app.renderer.resize(width, height);

    Game.currentScene.scale.x = width / Game.Dimensions.x;
    Game.currentScene.scale.y = height / Game.Dimensions.y;
  }
}
