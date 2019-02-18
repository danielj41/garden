import { mat4 } from "gl-matrix";

import shaders from "../shaders";
import models from "../models";
import { Render } from "./types";

const renderCompositeLayer: Render = function*(state) {
  const matrix = mat4.create();
  const matrix2 = mat4.create();
  const matrix3 = mat4.create();
  mat4.translate(matrix2, matrix2, [-2.5, 0, 0]);
  mat4.translate(matrix3, matrix3, [2.5, 0, 0]);

  yield {
    idFramebuffer: "canvas",
    shaderSetupParam: ["l1", "l2"],
    idShader: shaders.combine.id,
    idModel: models.square.id,
    modelMatrix: matrix
  };

  yield {
    idFramebuffer: "canvas",
    shaderSetupParam: ["l1"],
    idShader: shaders.combine.id,
    idModel: models.square.id,
    modelMatrix: matrix2
  };

  yield {
    idFramebuffer: "canvas",
    shaderSetupParam: ["l2"],
    idShader: shaders.combine.id,
    idModel: models.square.id,
    modelMatrix: matrix3
  };
};

export default renderCompositeLayer;
