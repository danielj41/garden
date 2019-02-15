import { PayloadAction, createSlice } from "redux-starter-kit";

interface Nodes {
  [id: string]: Node;
}

export interface Node {
  idLayer: string;
  x: number;
  y: number;
  connectDown: boolean;
  connectRight: boolean;
}

const initialState: Nodes = {
  "1": {
    idLayer: "2",
    connectDown: true,
    connectRight: false,
    x: 0.5,
    y: 0.5
  },
  "2": {
    idLayer: "2",
    connectDown: true,
    connectRight: false,
    x: 0.1,
    y: 0.1
  }
};

export default createSlice({
  slice: "nodes",
  initialState,
  reducers: {
    updatePosition: (
      state: Nodes,
      action: PayloadAction<{
        id: string;
        x: number;
        y: number;
      }>
    ) => {
      const { id, x, y } = action.payload;
      state[id].x += x;
      state[id].y += y;
    },
    delete: (
      state: Nodes,
      action: PayloadAction<{
        id: string;
      }>
    ) => {
      delete state[action.payload.id];
    }
  }
});
