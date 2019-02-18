import create from "./create";
import { getFramebuffer } from "../renderer/framebuffer";

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
      const { left, top, width, height } = document
        .getElementById(
          idFramebuffers.length === 1 ? idFramebuffers[0] : "composite"
        )
        .getBoundingClientRect();
      // TODO: pass in element id as parameter

      // TODO: Probably more a concern of `framebuffer.ts`--allow selecting
      // a portion of canvas as a "virtual" framebuffer?
      gl.enable(gl.SCISSOR_TEST);
      gl.viewport(left, gl.canvas.height - top - height, width, height);
      gl.scissor(left, gl.canvas.height - top - height, width, height);

      let index = 0;

      // TODO: allow arbitrary number of textures, fill all slots. right now
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
    },
    teardown: () => {
      gl.disable(gl.SCISSOR_TEST);
    }
  };

  return programInfo;
});
