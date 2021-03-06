import { Store } from "redux-starter-kit";
import { groupBy } from "lodash";
import { mat4 } from "gl-matrix";

import { render } from "../entities";
import framebuffers, { FramebufferInfo } from "../framebuffers";
import { State } from "../state";
import shaders, { ShaderProgramInfo } from "../shaders";
import models, { ModelBuffers } from "../models";

import { RenderTask } from "./types";

//
// Draw the scene.
//
export default function(gl: WebGLRenderingContext, store: Store<State>) {
  const state = store.getState();
  const tasks = [...render(state)];

  const groupedTasks = groupBy(tasks, task => JSON.stringify(task.framebuffer));

  // First pass: texture renders
  for (const tasks of Object.values(groupedTasks)) {
    const { framebuffer } = tasks[0];

    if (framebuffer.type === "texture") {
      renderWithFramebuffer(
        gl,
        framebuffers[framebuffer.type].get(gl, framebuffer.id),
        tasks
      );
    }
  }

  // Second pass: canvas renders
  for (const tasks of Object.values(groupedTasks)) {
    const { framebuffer } = tasks[0];

    if (framebuffer.type === "domNode") {
      renderWithFramebuffer(
        gl,
        framebuffers[framebuffer.type].get(gl, framebuffer.id),
        tasks
      );
    }
  }
}

function renderWithFramebuffer(
  gl: WebGLRenderingContext,
  framebufferInfo: FramebufferInfo,
  tasks: RenderTask[]
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

  const groupedTasks = groupBy(tasks, task => task.shader.id);
  for (const tasks of Object.values(groupedTasks)) {
    const { shader } = tasks[0];

    renderWithProgram(
      gl,
      projectionMatrix,
      viewMatrix,
      shaders[shader.id].shader(gl),
      tasks
    );
  }
}

function renderWithProgram(
  gl: WebGLRenderingContext,
  projectionMatrix: mat4,
  viewMatrix: mat4,
  programInfo: ShaderProgramInfo,
  tasks: RenderTask[]
) {
  gl.useProgram(programInfo.program);

  gl.uniformMatrix4fv(
    programInfo.uniformLocations.projectionMatrix,
    false,
    projectionMatrix
  );

  const groupedTasks = groupBy(tasks, task => task.model.id);
  for (const tasks of Object.values(groupedTasks)) {
    const { model } = tasks[0];

    renderWithModel(
      gl,
      viewMatrix,
      programInfo,
      models[model.id].get(gl),
      tasks
    );
  }
}

function renderWithModel(
  gl: WebGLRenderingContext,
  viewMatrix: mat4,
  programInfo: ShaderProgramInfo,
  buffers: ModelBuffers,
  tasks: RenderTask[]
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

    if (programInfo.attribLocations.texCoord !== undefined) {
      gl.bindBuffer(gl.ARRAY_BUFFER, buffers.texCoord);
      gl.vertexAttribPointer(
        programInfo.attribLocations.texCoord,
        numComponents,
        type,
        normalize,
        stride,
        offset
      );
      gl.enableVertexAttribArray(programInfo.attribLocations.texCoord);
    }
  }

  for (const task of tasks) {
    renderEntity(gl, viewMatrix, programInfo, task);
  }
}

function renderEntity(
  gl: WebGLRenderingContext,
  viewMatrix: mat4,
  programInfo: ShaderProgramInfo,
  renderTask: RenderTask
) {
  const { modelMatrix } = renderTask;

  if (programInfo.setup) {
    programInfo.setup(renderTask.shader.param);
  }

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

  if (programInfo.teardown) {
    programInfo.teardown();
  }
}
