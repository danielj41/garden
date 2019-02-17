import create from "./create";

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

  uniform sampler2D uTexture;
  varying vec2 vTexCoord;

  void main() {
    gl_FragColor = texture2D(uTexture, vTexCoord);
  }
`;

export default create(vsSource, fsSource, (gl, program) => {
  const programInfo = {
    program: program,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(program, "aVertexPosition"),
      texCoord: gl.getAttribLocation(program, "aTexCoord")
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(program, "uProjectionMatrix"),
      modelViewMatrix: gl.getUniformLocation(program, "uModelViewMatrix"),
      texture: gl.getUniformLocation(program, "uTexture")
    }
  };

  return programInfo;
});
