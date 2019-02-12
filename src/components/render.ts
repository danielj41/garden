import { mat4 } from "gl-matrix";
import { Buffers } from "../models/init";
import { ProgramInfo } from "../shaders/init";
import { Env, RenderTask } from "../render/types";

export default function(
  env: Env,
  shader: ProgramInfo,
  model: Buffers,
  matrix: mat4
): RenderTask {
  return {
    type: "render",
    programInfo: shader,
    buffers: model,
    modelMatrix: matrix
  };
}
