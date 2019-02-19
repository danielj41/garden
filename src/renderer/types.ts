import { ShaderLookup } from "../shaders";
import { ModelLookup } from "../models";
import { FramebufferLookup } from "../framebuffers";
import { mat4 } from "gl-matrix";

export interface RenderTask {
  framebuffer: FramebufferLookup;
  shader: ShaderLookup;
  model: ModelLookup;
  modelMatrix: mat4;
}
