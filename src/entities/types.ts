import { State } from "../reducers";
import { RenderTask, Env } from "../render/types";

export type Render = (env: Env, state: State) => Iterable<RenderTask>;

export interface Entity {
  render: Render;
}
