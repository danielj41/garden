import { mat4 } from "gl-matrix";

import shaders from "../shaders";
import models from "../models";
import { Render } from "./types";

const renderCompositeLayer: Render = function*(state) {
  const matrix = mat4.create();

  yield {
    idFramebuffer: "canvas",
    shaderSetupParam: ["l1"],
    idShader: shaders.combine.id,
    idModel: models.square.id,
    modelMatrix: matrix
  };
};

export default renderCompositeLayer;
