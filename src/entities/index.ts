import { Render } from "./types";
import renderNodes from "./nodes";

export const render: Render = function*(state) {
  yield* renderNodes(state);
};
