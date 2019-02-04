import defaultShader from "../shaders/default";
import squareModel from "../models/square";
import { mat4 } from "gl-matrix";

import render from "../components/render";
import { defaultState, getState, setState } from "../components/state";
import { Env } from "../render/types";

export default function*(env: Env) {
  yield* defaultState(env, "startTime", Date.now());
  const startTime = getState(env, "startTime", Date.now());

  const x = (Date.now() - startTime) / 1000;

  if (x > 5) {
    yield* setState(env, "startTime", Date.now());
  }

  const matrix = mat4.create();
  const matrix2 = mat4.create();
  mat4.translate(matrix, matrix2, [x, 0, 0]);

  yield* render(env, defaultShader(env.gl), squareModel(env.gl), matrix);
}
