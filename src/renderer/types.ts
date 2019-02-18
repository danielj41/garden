import { IdShader } from "../shaders";
import { IdModel } from "../models";
import { mat4 } from "gl-matrix";

export interface RenderTask {
  idFramebuffer: string | "canvas";
  idShader: IdShader;
  shaderSetupParams?: any; // TODO: Parameterize ?
  idModel: IdModel;
  modelMatrix: mat4;
}
