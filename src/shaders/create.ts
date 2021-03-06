import memoize from "memoize-one";

// TODO: Standardize naming (is it shader or program?)
export interface ShaderProgramInfo {
  program: WebGLProgram;
  attribLocations: {
    vertexPosition: number;
    texCoord?: number;
  };
  uniformLocations: {
    projectionMatrix: WebGLUniformLocation;
    modelViewMatrix: WebGLUniformLocation;
  };
  setup?: (t: any) => void; // TODO: Parameterize `t`
  teardown?: () => void;
}

//
// Initialize a shader program, so WebGL knows how to draw our data
//
export default (
  vsSource: string,
  fsSource: string,
  getInfo: (
    gl: WebGLRenderingContext,
    shaderProgram: WebGLProgram
  ) => ShaderProgramInfo
) =>
  memoize((gl: WebGLRenderingContext) => {
    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

    // Create the shader program

    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    // If creating the shader program failed, alert

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      alert(
        "Unable to initialize the shader program: " +
          gl.getProgramInfoLog(shaderProgram)
      );
      return null;
    }

    return getInfo(gl, shaderProgram);
  });

//
// creates a shader of the given type, uploads the source and
// compiles it.
//
function loadShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);

  // Send the source to the shader object

  gl.shaderSource(shader, source);

  // Compile the shader program

  gl.compileShader(shader);

  // See if it compiled successfully

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert(
      "An error occurred compiling the shaders: " + gl.getShaderInfoLog(shader)
    );
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}
