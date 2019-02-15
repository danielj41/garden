import { mat4 } from "gl-matrix";
import defaultShader from "../shaders/default";
import squareModel from "../models/square";

import { Render } from "./types";

const renderCompositeLayer: Render = function*(state) {
  const matrix = mat4.create();

  yield {
    shader: defaultShader, // replace with shader that combines frameBuffers
    model: squareModel,
    modelMatrix: matrix,
    frameBuffer: null // render to main canvas
  };
};

export default renderCompositeLayer;
