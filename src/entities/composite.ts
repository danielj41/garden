import { mat4 } from "gl-matrix";

import shaders from "../shaders";
import models from "../models";
import { Render } from "./types";

const renderCompositeLayer: Render = function*(state) {
  const matrix = mat4.create();
  mat4.translate(matrix, matrix, [0, 1.2, 0]);

  // all layers
  yield {
    idFramebuffer: "canvas",
    shaderSetupParam: Object.keys(state.layers),
    idShader: shaders.combine.id,
    idModel: models.square.id,
    modelMatrix: matrix
  };

  // single layer
  let index = 0;
  for (const idLayer in state.layers) {
    const matrix = mat4.create();
    mat4.translate(matrix, matrix, [index * 2 - 2, -1.2, 0]);

    yield {
      idFramebuffer: "canvas",
      shaderSetupParam: [idLayer],
      idShader: shaders.combine.id,
      idModel: models.square.id,
      modelMatrix: matrix
    };
    index++;
  }
};

export default renderCompositeLayer;
