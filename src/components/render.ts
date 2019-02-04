import { mat4 } from "gl-matrix";
import { Buffers } from "../models/init";
import { ProgramInfo } from "../shaders/init";

export default (
  env: any,
  shader: ProgramInfo,
  model: Buffers,
  matrix: mat4
) => {
  return {
    programInfo: shader,
    buffers: model,
    modelMatrix: matrix
  };
};
