
import cube from "./assets/cube.png";

type Asset = {
  alias: string;
  src: string;
}

export const assets: Asset[] = [
	{ alias: "cube", src: cube },
]

export const ASSET_KEYS = Object.freeze(
  {"cube":"cube"}
)
