import { mat4 } from "gl-matrix";
import defaultShader from "../shaders/default";
import squareModel from "../models/square";

import { Entity } from "./types";

export const Node: Entity = {
  render: function*(state) {
    for (const id in state.nodes) {
      const node = state.nodes[id];

      const matrix = mat4.create();
      const matrix2 = mat4.create();
      mat4.translate(matrix, matrix2, [node.x, node.y, 0]);

      yield {
        shader: defaultShader,
        model: squareModel,
        modelMatrix: matrix
      };
    }
  }
};
