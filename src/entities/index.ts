/*import MovingSquare, { MovingSquareState } from "./moving-square";

import { combineReducers, Reducer } from "redux";
import { Env, Task } from "../render/types";
import { Entity, EntityAction, EntityState } from "./types";

export const reducers = {
  MovingSquare: MovingSquare.reducer
};

interface State {
  [id: string]: EntityState;
}

export function reducer(state: State, action: EntityAction) {
  const newState = {
    ...state
  };
}

export const renderers = {
  MovingSquare: MovingSquare.render
};
*/

import { Render } from "./types";
import { Node } from "./node";

export const render: Render = function*(env, state) {
  yield* Node.render(env, state);
};
