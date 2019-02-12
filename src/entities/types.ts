/*import { Env, Task } from "../render/types";
import { Reducer, Action } from "redux";

export interface EntityState {
  type: string;
}

export type Render<S extends EntityState> = (
  env: Env,
  state: S
) => Iterable<Task>;

export interface EntityAction extends Action {
  id: string;
}

export interface Entity<S extends EntityState> {
  reducer: Reducer<S>;
  render: Render<S>;
}
*/

export type Render = (env: Env, state: State) => Iterable<RenderTask>;

import { State } from "../reducers";
import { RenderTask, Env } from "../render/types";
export interface Entity {
  render: Render;
}
