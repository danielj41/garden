import { mat4 } from "gl-matrix";

import shaders from "../shaders";
import models from "../models";
import { Render } from "./types";

const renderCompositeLayer: Render = function*(state) {
  const matrix = mat4.create();
  mat4.translate(matrix, matrix, [0, 0, 0]);
  // all layers
  yield {
    idFramebuffer: {
      type: "domNode",
      idDomNode: "composite"
    },
    shaderSetupParam: Object.keys(state.layers),
    idShader: shaders.combine.id,
    idModel: models.square.id,
    modelMatrix: matrix
  };

  // single layer
  for (const idLayer in state.layers) {
    yield {
      idFramebuffer: {
        type: "domNode",
        idDomNode: idLayer
      },
      shaderSetupParam: [idLayer],
      idShader: shaders.combine.id,
      idModel: models.square.id,
      modelMatrix: matrix
    };
  }
};

export default renderCompositeLayer;
