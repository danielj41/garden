import { RenderTask } from "../render/types";
import { State } from "../state";

export type Render = (state: State) => Iterable<RenderTask>;

export interface Entity {
  render: Render;
}
