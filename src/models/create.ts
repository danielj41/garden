import memoize from "memoize-one";

export interface ModelBuffers {
  [name: string]: WebGLBuffer;
}

export default (positions: number[]) =>
  memoize((gl: WebGLRenderingContext) => {
    const positionBuffer = gl.createBuffer();

    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    return {
      position: positionBuffer
    };
  });
