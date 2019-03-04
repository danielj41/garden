import create from "./create";
import { getTexture } from "../framebuffers/texture";

const vsSource = `
  attribute vec4 aVertexPosition;
  attribute vec2 aTexCoord;

  uniform mat4 uModelViewMatrix;
  uniform mat4 uProjectionMatrix;

  varying vec2 vTexCoord;

  void main() {
    gl_Position = aVertexPosition;

    vTexCoord = aTexCoord;
  }
`;

const fsSource = `
  precision mediump float;

  uniform sampler2D uTexture0;
  uniform sampler2D uTexture1;
  uniform sampler2D uTexture2;
  uniform sampler2D uTexture3;
  uniform float uTexture0Mode;
  uniform float uTexture1Mode;
  uniform float uTexture2Mode;
  uniform float uTexture3Mode;
  varying vec2 vTexCoord;

  void main() {
    gl_FragColor =
      vec4(uTexture0Mode, uTexture0Mode, uTexture0Mode, uTexture0Mode) * texture2D(uTexture0, vTexCoord) +
      vec4(uTexture1Mode, uTexture1Mode, uTexture1Mode, uTexture1Mode) * texture2D(uTexture1, vTexCoord) +
      vec4(uTexture2Mode, uTexture2Mode, uTexture2Mode, uTexture2Mode) * texture2D(uTexture2, vTexCoord) +
      vec4(uTexture3Mode, uTexture3Mode, uTexture3Mode, uTexture3Mode) * texture2D(uTexture3, vTexCoord);
  }
`;

export type Layer = {
  idFramebuffer: string;
  mode: number;
};

export default create(vsSource, fsSource, (gl, program) => {
  const textureLocations = [
    gl.getUniformLocation(program, "uTexture0"),
    gl.getUniformLocation(program, "uTexture1"),
    gl.getUniformLocation(program, "uTexture2"),
    gl.getUniformLocation(program, "uTexture3")
  ];

  const textureModeLocations = [
    gl.getUniformLocation(program, "uTexture0Mode"),
    gl.getUniformLocation(program, "uTexture1Mode"),
    gl.getUniformLocation(program, "uTexture2Mode"),
    gl.getUniformLocation(program, "uTexture3Mode")
  ];

  const GL_TEXTURE = [gl.TEXTURE0, gl.TEXTURE1, gl.TEXTURE2, gl.TEXTURE3];

  const programInfo = {
    program: program,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(program, "aVertexPosition"),
      texCoord: gl.getAttribLocation(program, "aTexCoord")
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(program, "uProjectionMatrix"),
      modelViewMatrix: gl.getUniformLocation(program, "uModelViewMatrix")
    },
    setup: (layers: Layer[]) => {
      // TODO: Type safety for `setup` params
      let lastIndex = -1;

      layers.forEach(({ idFramebuffer, mode }, index) => {
        const { targetTexture: texture } = getTexture(gl, idFramebuffer);
        gl.activeTexture(GL_TEXTURE[index]);
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.uniform1i(textureLocations[index], index);
        gl.uniform1f(textureModeLocations[index], mode);
        lastIndex = index;
      });

      // Fill the rest of the shader with 0s
      while (lastIndex < 4) {
        lastIndex++;
        gl.uniform1f(textureModeLocations[lastIndex], 0);
      }
    },
    teardown: () => {}
  };

  return programInfo;
});
