import { mat4 } from "gl-matrix";
import defaultShader from "../shaders/default";
import squareModel from "../models/square";
import nodesSlice, { Node } from "../state/nodes";

import { Render } from "./types";

const renderNodes: Render = function*(state) {
  const nodes = nodesSlice.selectors.getNodes(state);

  for (const node of Object.values(nodes)) {
    yield* renderNode(node);
  }
};

const renderNode = function*(node: Node) {
  const matrix = mat4.create();
  mat4.translate(matrix, matrix, [node.x, node.y, 0]);

  yield {
    shader: defaultShader,
    model: squareModel,
    modelMatrix: matrix,
    idFramebuffer: node.idLayer
  };
};

export default renderNodes;
