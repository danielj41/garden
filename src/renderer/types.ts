import { IdShader } from "../shaders";
import { IdModel } from "../models";
import { mat4 } from "gl-matrix";

export interface RenderTask {
  idFramebuffer: string | "canvas";
  idShader: IdShader;
  shaderSetupParam?: any; // TODO: Parameterize/couple to `idShader`
  idModel: IdModel;
  modelMatrix: mat4;
}
