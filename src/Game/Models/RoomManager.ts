import { Container, Text } from "pixi.js";
import { Room } from "./Room";
import { Class, Game } from "../../Engine/Game/Game";
import { GameScene } from "../Scenes/GameScene";

export class RoomManager {
  currentRoom: Room;
  scene: Container;
  roomText: Text;

  constructor(scene: GameScene) {
    scene.world.add({
      roomManager: this,
    });

    this.currentRoom = new StartRoom();
    this.scene = scene;
    this.roomText = new Text({
      style: {
        fill: 0xffffff,
      },
    });
    this.roomText.position.y = Game.Dimensions.y / 2 - this.roomText.height / 2;

    this.updateRoom();

    this.scene.addChild(this.roomText);
  }

  moveToRoom(direction: keyof Room["adjacentRooms"]) {
    if (!this.currentRoom.adjacentRooms[direction]) {
      return;
    }
    this.changeRoom(this.currentRoom.adjacentRooms[direction]!);
  }

  public update() {}

  changeRoom(room: Class<Room>) {
    this.currentRoom = new room();
    this.updateRoom();
  }

  private updateRoom() {
    this.roomText.text = this.currentRoom.identifier;
    this.roomText.position.x = Game.Dimensions.x / 2 - this.roomText.width / 2;
  }
}

export class StartRoom implements Room {
  identifier: string = "Start Room";
  adjacentRooms: {
    north: Class<Room>;
    south: Class<Room>;
    west: Class<Room>;
    east: Class<Room>;
  };

  constructor() {
    this.adjacentRooms = {
      east: OtherRoom,
      north: OtherRoom,
      south: SuperSecretRoom,
      west: OtherRoom,
    };
  }
}

export class OtherRoom implements Room {
  identifier: string = "Other Room";
  adjacentRooms: {
    north: Class<Room>;
    south: Class<Room>;
    west: Class<Room>;
    east: Class<Room>;
  };

  /**
   *
   */
  constructor() {
    this.adjacentRooms = {
      east: StartRoom,
      north: StartRoom,
      south: StartRoom,
      west: StartRoom,
    };
  }
}

export class SuperSecretRoom implements Room {
  identifier: string = "Super Secret Room";
  adjacentRooms: Partial<{
    north: Class<Room>;
    south: Class<Room>;
    west: Class<Room>;
    east: Class<Room>;
  }> = {
    north: StartRoom,
  };
}
