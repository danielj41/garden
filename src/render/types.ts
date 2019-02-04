import { ProgramInfo } from "../shaders/init";
import { Buffers } from "../models/init";
import { mat4 } from "gl-matrix";

export interface RenderTask {
  type: "render";
  programInfo: ProgramInfo;
  buffers: Buffers;
  modelMatrix: mat4;
}

export interface StateUpdateTask {
  type: "state-update";
  id: string;
  key: string;
  value: any;
}

export interface State {
  [key: string]: any;
}

export interface Env {
  id: string;
  gl: WebGLRenderingContext;
  state: State;
}

export type Task = RenderTask | StateUpdateTask;

export interface Entity {
  state: { [key: string]: any };
  tick(env: Env): IterableIterator<Task>;
}
