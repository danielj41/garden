import { Store } from "redux-starter-kit";
import { groupBy } from "lodash";

import { mat4 } from "gl-matrix";
import { render } from "../entities";
import { RenderTask } from "./types";
import { getCanvas, FramebufferInfo, getFramebuffer } from "./framebuffer";
import { State } from "../state";
import { ShaderProgramInfo } from "../shaders/create";
import { ModelBuffers } from "../models/create";
import shaders from "../shaders";
import models from "../models";

//
// Draw the scene.
//
export default function(gl: WebGLRenderingContext, store: Store<State>) {
  const state = store.getState();
  const tasks = [...render(state)];

  const groupedTasks = groupBy(tasks, task => task.idFramebuffer);

  for (const idFramebuffer of Object.keys(groupedTasks)) {
    if (idFramebuffer === "canvas") {
      continue;
    }

    renderWithFramebuffer(
      gl,
      getFramebuffer(gl, idFramebuffer),
      groupedTasks[idFramebuffer]
    );
  }

  renderWithFramebuffer(gl, getCanvas(gl), groupedTasks["canvas"]);
}

function renderWithFramebuffer(
  gl: WebGLRenderingContext,
  framebufferInfo: FramebufferInfo,
  tasks: Iterable<RenderTask>
) {
  framebufferInfo.use();

  // Create a perspective matrix, a special matrix that is
  // used to simulate the distortion of perspective in a camera.
  // Our field of view is 45 degrees, with a width/height
  // ratio that matches the display size of the canvas
  // and we only want to see objects between 0.1 units
  // and 100 units away from the camera.

  const fieldOfView = (45 * Math.PI) / 180; // in radians
  const aspect = framebufferInfo.getAspectRatio();
  const zNear = 0.1;
  const zFar = 100.0;
  const projectionMatrix = mat4.create();

  // note: glmatrix.js always has the first argument
  // as the destination to receive the result.
  mat4.perspective(projectionMatrix, fieldOfView, aspect, zNear, zFar);

  // Set the drawing position to the "identity" point, which is
  // the center of the scene.
  const viewMatrix = mat4.create();

  // Now move the drawing position a bit to where we want to
  // start drawing the square.

  mat4.translate(
    viewMatrix, // destination matrix
    viewMatrix, // matrix to translate
    [-0.0, 0.0, -6.0]
  ); // amount to translate

  for (const task of tasks) {
    // TODO: Group tasks by (frameBuffer, shaderProgram). Render main canvas last.
    renderWithProgram(
      gl,
      projectionMatrix,
      viewMatrix,
      shaders[task.idShader].shader(gl),
      tasks
    );
  }
}

function renderWithProgram(
  gl: WebGLRenderingContext,
  projectionMatrix: mat4,
  viewMatrix: mat4,
  programInfo: ShaderProgramInfo,
  tasks: Iterable<RenderTask>
) {
  gl.useProgram(programInfo.program);

  gl.uniformMatrix4fv(
    programInfo.uniformLocations.projectionMatrix,
    false,
    projectionMatrix
  );

  for (const task of tasks) {
    renderWithModel(
      gl,
      viewMatrix,
      programInfo,
      models[task.idModel].model(gl),
      tasks
    );
  }
}

function renderWithModel(
  gl: WebGLRenderingContext,
  viewMatrix: mat4,
  programInfo: ShaderProgramInfo,
  buffers: ModelBuffers,
  tasks: Iterable<RenderTask>
) {
  // Tell WebGL how to pull out the positions from the position
  // buffer into the vertexPosition attribute.
  {
    const numComponents = 2;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
    gl.vertexAttribPointer(
      programInfo.attribLocations.vertexPosition,
      numComponents,
      type,
      normalize,
      stride,
      offset
    );
    gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
  }

  for (const task of tasks) {
    renderEntity(gl, viewMatrix, programInfo, task);
  }
}

function renderEntity(
  gl: WebGLRenderingContext,
  viewMatrix: mat4,
  programInfo: ShaderProgramInfo,
  { modelMatrix }: RenderTask
) {
  const modelViewMatrix = mat4.create();
  mat4.multiply(modelViewMatrix, modelMatrix, viewMatrix);

  // Tell WebGL to use our program when drawing

  // Set the shader uniforms

  gl.uniformMatrix4fv(
    programInfo.uniformLocations.modelViewMatrix,
    false,
    modelViewMatrix
  );

  {
    const offset = 0;
    const vertexCount = 4;
    gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCount);
  }
}
