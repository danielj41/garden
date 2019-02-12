import { combineReducers, Reducer } from "redux";

export interface State {
  layers: Layers;
  nodes: Nodes;
}

export interface Layers {
  [id: string]: Layers;
}

export interface Nodes {
  [id: string]: Node;
}

export type BlendMode = "add" | "subtract";

export interface Layer {
  blendMode: BlendMode;
  orientation: number;
  order: number;
}

export interface Node {
  idLayer: string;
  x: number;
  y: number;
  connectDown: boolean;
  connectRight: boolean;
}

const layers: Reducer<Layers> = function(state = {}, action) {
  return state;
};

const nodes: Reducer<Nodes> = function(
  state = {
    "1": {
      idLayer: "2",
      connectDown: true,
      connectRight: false,
      x: 0.5,
      y: 0.5
    }
  },
  action
) {
  switch (action.type) {
    case "NODE_UPDATE_POSITION":
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          x: state[action.id].x + action.x,
          y: state[action.id].y + action.y
        }
      };
    default:
      return state;
  }
};

export const reducer = combineReducers({
  layers,
  nodes
});
