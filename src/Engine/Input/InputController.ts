import Vector from "victor";
import { clamp } from "../Math/clamp";

export class InputController {
  static direction: Vector;

  static init() {
    InputController.direction = new Vector(0, 0);

    window.addEventListener("keydown", InputController.keyDownHandler);
    window.addEventListener("keyup", InputController.keyUpHandler);
  }

  private static keyDownHandler(event: KeyboardEvent) {
    if (event.code === "KeyW") {
      InputController.direction.add(Vector2.UP);
    }

    if (event.code === "KeyS") {
      InputController.direction.add(Vector2.DOWN);
    }

    if (event.code === "KeyA") {
      InputController.direction.add(Vector2.LEFT);
    }

    if (event.code === "KeyD") {
      InputController.direction.add(Vector2.RIGHT);
    }

    InputController.clamp();
  }

  private static keyUpHandler(event: KeyboardEvent) {
    if (event.code === "KeyW") {
      InputController.direction.subtract(Vector2.UP);
    }

    if (event.code === "KeyS") {
      InputController.direction.subtract(Vector2.DOWN);
    }

    if (event.code === "KeyA") {
      InputController.direction.subtract(Vector2.LEFT);
    }

    if (event.code === "KeyD") {
      InputController.direction.subtract(Vector2.RIGHT);
    }

    InputController.clamp();
  }

  private static clamp() {
    InputController.direction.x = clamp(-1, InputController.direction.x, 1);
    InputController.direction.y = clamp(-1, InputController.direction.y, 1);
  }
}

export namespace Vector2 {
  export const UP = new Vector(0, -1);
  export const DOWN = new Vector(0, 1);
  export const LEFT = new Vector(-1, 0);
  export const RIGHT = new Vector(1, 0);
}
