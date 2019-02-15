import { combineReducers, Reducer } from "redux-starter-kit";

import layersSlice from "./layers";
import nodesSlice from "./nodes";

export const reducer = combineReducers({
  layers: layersSlice.reducer,
  nodes: nodesSlice.reducer
});

export type State = typeof reducer extends Reducer<infer S> ? S : never;
