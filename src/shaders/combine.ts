import create from "./create";
import { getFramebuffer } from "../renderer/framebuffer";

const vsSource = `
  attribute vec4 aVertexPosition;
  attribute vec2 aTexCoord;

  uniform mat4 uModelViewMatrix;
  uniform mat4 uProjectionMatrix;

  varying vec2 vTexCoord;

  void main() {
    gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;

    vTexCoord = aTexCoord;
  }
`;

const fsSource = `
  precision mediump float;

  uniform sampler2D uTexture0;
  uniform sampler2D uTexture1;
  varying vec2 vTexCoord;

  void main() {
    gl_FragColor = texture2D(uTexture0, vTexCoord) + texture2D(uTexture1, vTexCoord);
  }
`;

export type IdFramebuffers = string[];

export default create(vsSource, fsSource, (gl, program) => {
  const textureLocations = [
    gl.getUniformLocation(program, "uTexture0"),
    gl.getUniformLocation(program, "uTexture1")
  ];

  const textureMap = [gl.TEXTURE0, gl.TEXTURE1];

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
    setup: (idFramebuffers: IdFramebuffers) => {
      let index = 0;

      // todo: allow arbitrary number of textures, fill all slots. right now
      // works for 1 or 2.
      while (index < 2) {
        for (const idFramebuffer of idFramebuffers) {
          const { targetTexture } = getFramebuffer(gl, idFramebuffer);
          gl.activeTexture(textureMap[index]);
          gl.bindTexture(gl.TEXTURE_2D, targetTexture);
          gl.uniform1i(textureLocations[index], index);
          index++;
        }
      }
    }
  };

  return programInfo;
});
