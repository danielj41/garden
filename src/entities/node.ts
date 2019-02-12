import { mat4 } from "gl-matrix";
import defaultShader from "../shaders/default";
import squareModel from "../models/square";
import render from "../components/render";

import { Entity } from "./types";

export const Node: Entity = {
  render: function*(env, state) {
    for (const id in state.nodes) {
      const node = state.nodes[id];

      const matrix = mat4.create();
      const matrix2 = mat4.create();
      mat4.translate(matrix, matrix2, [node.x, node.y, 0]);

      yield render(env, defaultShader(env.gl), squareModel(env.gl), matrix);
    }
  }
};
