import { State } from "../reducers";
import { RenderTask } from "../render/types";

export type Render = (state: State) => Iterable<RenderTask>;

export interface Entity {
  render: Render;
}
