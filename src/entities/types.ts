import { RenderTask } from "../renderer/types";
import { State } from "../state";

export type Render = (state: State) => Iterable<RenderTask>;
