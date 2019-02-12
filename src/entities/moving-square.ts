/*import defaultShader from "../shaders/default";
import squareModel from "../models/square";
import { mat4 } from "gl-matrix";

import render from "../components/render";
import { Env } from "../render/types";
import { Entity, EntityState } from "./types";

export interface MovingSquareState {
  type: "MOVING_SQUARE";
  x: number;
  y: number;
}

const MovingSquare: Entity<MovingSquareState> = {
  reducer(
    state = {
      type: "MOVING_SQUARE",
      x: 0.5,
      y: 0.5
    },
    action
  ) {
    switch (action.type) {
      case "MOVING_SQUARE_UPDATE":
        return {
          ...state,
          x: action.x,
          y: action.y
        };
      default:
        return state;
    }
  },

  render: function*(env, state) {
    const matrix = mat4.create();
    const matrix2 = mat4.create();
    mat4.translate(matrix, matrix2, [state.x, state.y, 0]);

    yield render(env, defaultShader(env.gl), squareModel(env.gl), matrix);
  }
};

export default MovingSquare;
*/
