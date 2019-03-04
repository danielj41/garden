import create from "./create";

const vsSource = `
  attribute vec4 aVertexPosition;

  uniform mat4 uModelViewMatrix;
  uniform mat4 uProjectionMatrix;

  void main() {
    gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
  }
`;

const fsSource = `
  uniform mediump vec4 uColor;

  void main() {
    gl_FragColor = uColor;
  }
`;

// Initialize a shader program; this is where all the lighting
// for the vertices and so forth is established.
export default create(vsSource, fsSource, (gl, shaderProgram) => {
  // Collect all the info needed to use the shader program.
  // Look up which attribute our shader program is using
  // for aVertexPosition and look up uniform locations.

  const colorLocation = gl.getUniformLocation(shaderProgram, "uColor");

  const programInfo = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram, "aVertexPosition")
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(
        shaderProgram,
        "uProjectionMatrix"
      ),
      modelViewMatrix: gl.getUniformLocation(shaderProgram, "uModelViewMatrix")
    },
    setup: ({ color }: { color: number[] }) => {
      gl.uniform4fv(colorLocation, color);
    }
  };

  return programInfo;
});
