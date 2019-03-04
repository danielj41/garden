import { createSlice } from "redux-starter-kit";

interface Layers {
  [id: string]: Layer;
}

type BlendMode = "add" | "subtract";

export interface Layer {
  blendMode: BlendMode;
}

const initialState: Layers = {
  l1: {
    blendMode: "add"
  },
  l2: {
    blendMode: "add"
  },
  l3: {
    blendMode: "subtract"
  }
};

export default createSlice({
  slice: "layers",
  initialState,
  reducers: {}
});
