import { Render } from "./types";
import renderNodes from "./nodes";
import renderCompositeLayer from "./composite";

export const render: Render = function*(state) {
  yield* renderNodes(state);
  yield* renderCompositeLayer(state);
};
