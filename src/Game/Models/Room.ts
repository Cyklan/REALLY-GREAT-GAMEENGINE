import { Class } from "../../Engine/Game/Game";

export interface Room {
  identifier: string;
  adjacentRooms: Partial<{
    north: Class<Room>;
    south: Class<Room>;
    west: Class<Room>;
    east: Class<Room>;
  }>;
}
