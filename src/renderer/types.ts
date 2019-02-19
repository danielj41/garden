import { IdShader } from "../shaders";
import { IdModel } from "../models";
import { FramebufferType } from "../framebuffers";
import { mat4 } from "gl-matrix";

export interface RenderTask {
  framebuffer: {
    type: FramebufferType;
    id: string;
  };
  idShader: IdShader;
  shaderSetupParam?: any; // TODO: Parameterize/couple to `idShader`
  idModel: IdModel;
  modelMatrix: mat4;
}
