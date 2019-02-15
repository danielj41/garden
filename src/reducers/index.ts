import { combineReducers, Reducer } from "redux-starter-kit";

import { layers } from "./layers";
import { nodes } from "./nodes";

export const reducer = combineReducers({
  layers: layers.reducer,
  nodes: nodes.reducer
});

export type State = typeof reducer extends Reducer<infer X> ? X : null;
