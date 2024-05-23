import {
  type Body,
  type Constraint,
  type MouseConstraint,
  Composite,
  Engine,
} from "matter-js";
import { timeManager } from "../Time/TimeManager";

export class Physics {
  engine: Engine = Engine.create();

  update() {
    Engine.update(this.engine, timeManager.delta * 1000);
  }

  addBodies(
    ...bodies: (
      | Composite
      | Body
      | Constraint
      | MouseConstraint
      | (Composite | Body | Constraint | MouseConstraint)
    )[]
  ) {
    Composite.add(this.engine.world, bodies);
  }
}
