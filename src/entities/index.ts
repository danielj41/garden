import { Render } from "./types";
import { Node } from "./node";

export const render: Render = function*(env, state) {
  yield* Node.render(env, state);
};
