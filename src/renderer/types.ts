import { IdShader } from "../shaders";
import { IdModel } from "../models";
import { mat4 } from "gl-matrix";

type IdFramebuffer =
  | {
      type: "texture";
      idTexture: string;
    }
  | {
      type: "domNode";
      idDomNode: string;
    }; // | { type: "canvas" }

export interface RenderTask {
  idFramebuffer: IdFramebuffer;
  idShader: IdShader;
  shaderSetupParam?: any; // TODO: Parameterize/couple to `idShader`
  idModel: IdModel;
  modelMatrix: mat4;
}
