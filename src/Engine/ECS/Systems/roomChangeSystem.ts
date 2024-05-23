import { GameWorld } from "../../../Game/Scenes/GameScene";
import { Room } from "../../../Game/Models/Room";
import { Game } from "../../Game/Game";
import Vector from "victor";

export function roomChangeSystem(world: GameWorld) {
  const controllables = world.with("controllable", "position");
  const roomManagers = world.with("roomManager");

  return function () {
    for (const { roomManager } of roomManagers) {
      for (const { position } of controllables) {
        const { outOfBounds, direction } = checkOutOfBounds(
          position.localPosition
        );

        if (!outOfBounds) {
          continue;
        }

        position.localPosition = getNewPlayerCoordinates(
          direction,
          position.localPosition
        );
        roomManager.moveToRoom(direction);
      }
    }
  };
}

function getNewPlayerCoordinates(
  currentDirection: keyof Room["adjacentRooms"],
  currentPosition: Vector
): Vector {
  switch (currentDirection) {
    case "east":
      return new Vector(0, currentPosition.y);
    case "west":
      return new Vector(Game.Dimensions.x - 16, currentPosition.y);
    case "north":
      return new Vector(currentPosition.x, Game.Dimensions.y - 16);
    case "south":
      return new Vector(currentPosition.x, 0);
  }
}

function checkOutOfBounds(position: Vector): {
  outOfBounds: boolean;
  direction: keyof Room["adjacentRooms"];
} {
  if (position.y < 0) {
    return {
      direction: "north",
      outOfBounds: true,
    };
  }
  if (position.y > Game.Dimensions.y - 16) {
    return {
      direction: "south",
      outOfBounds: true,
    };
  }

  if (position.x < 0) {
    return {
      direction: "west",
      outOfBounds: true,
    };
  }
  if (position.x > Game.Dimensions.x - 16) {
    return {
      direction: "east",
      outOfBounds: true,
    };
  }

  return {
    direction: "east",
    outOfBounds: false,
  };
}
