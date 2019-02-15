import { RenderTask } from "../render/types";
import { State } from "../reducers";

export type Render = (state: State) => Iterable<RenderTask>;

export interface Entity {
  render: Render;
}
