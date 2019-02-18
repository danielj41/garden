import renderNodes from "./nodes";
import renderCompositeLayer from "./composite";
import { Render } from "./types";

export const render: Render = function*(state) {
  yield* renderNodes(state);
  yield* renderCompositeLayer(state);
};
