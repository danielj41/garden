import defaultShader from "../shaders/default";
import squareModel from "../models/square";
import { mat4 } from "gl-matrix";

import render from "../components/render";
import state from "../components/state";

export default function(env: any) {
  const [startTime, setStartTime] = state(env, "startTime", Date.now());

  const x = (Date.now() - startTime) / 1000;

  if (x > 5) {
    setStartTime(Date.now());
  }

  const matrix = mat4.create();
  const matrix2 = mat4.create();
  mat4.translate(matrix, matrix2, [x, 0, 0]);

  return render(env, defaultShader(env.gl), squareModel(env.gl), matrix);
}
