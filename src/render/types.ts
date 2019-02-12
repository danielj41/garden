import { ProgramInfo } from "../shaders/init";
import { Buffers } from "../models/init";
import { mat4 } from "gl-matrix";

export interface RenderTask {
  type: "render";
  programInfo: ProgramInfo;
  buffers: Buffers;
  modelMatrix: mat4;
}

export interface Env {
  gl: WebGLRenderingContext;
}

export type Task = RenderTask;
