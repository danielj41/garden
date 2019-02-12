import { Render } from "./types";
import { Node } from "./node";

export const render: Render = function*(state) {
  yield* Node.render(state);
};
