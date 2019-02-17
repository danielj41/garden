import memoize from "memoize-one";

// TODO: Parameterize this type
export interface ModelBuffers {
  [name: string]: WebGLBuffer;
}

export default (positions: number[], texCoord?: number[]) =>
  memoize((gl: WebGLRenderingContext) => {
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

    let texCoordBuffer;
    if (texCoord) {
      texCoordBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array(texCoord),
        gl.STATIC_DRAW
      );
    }

    return {
      position: positionBuffer,
      texCoords: texCoordBuffer
    };
  });
