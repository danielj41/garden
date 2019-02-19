import { mat4 } from "gl-matrix";

import nodesSlice, { Node } from "../state/nodes";
import { RenderTask } from "../renderer/types";

import { Render } from "./types";

const renderNodes: Render = function*(state) {
  const nodes = nodesSlice.selectors.getNodes(state);

  for (const node of Object.values(nodes)) {
    yield* renderNode(node);
  }
};

const renderNode = function*(node: Node): Iterable<RenderTask> {
  const matrix = mat4.create();
  mat4.translate(matrix, matrix, [node.x, node.y, 0]);

  yield {
    framebuffer: {
      type: "texture",
      id: node.idLayer
    },
    shader: {
      id: "default",
      param: null
    },
    model: {
      id: "square"
    },
    modelMatrix: matrix
  };
};

export default renderNodes;
