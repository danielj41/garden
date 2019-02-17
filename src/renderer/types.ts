import { ShaderProgramInfo } from "../shaders/create";
import { ModelBuffers } from "../models/create";
import { mat4 } from "gl-matrix";

export interface RenderTask {
  shader: (gl: WebGLRenderingContext) => ShaderProgramInfo;
  model: (gl: WebGLRenderingContext) => ModelBuffers;
  modelMatrix: mat4;
  idFramebuffer: string | null;
}
