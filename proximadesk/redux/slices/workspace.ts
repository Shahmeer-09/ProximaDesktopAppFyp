import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface workspaceProps {
  workspace: {
    id: string;
    name: string;
    type: "PERSONAL"|"PUBLIC";
  }[];
}


const initialstate: workspaceProps = {
  workspace: [],
};


const workspaceSlice = createSlice({
  name: "workspace",
  initialState: initialstate,
  reducers: {
    WORKSPACE: (state, action: PayloadAction<workspaceProps>) => {
      return { ...action.payload };
    },
  },
});

export const { WORKSPACE } = workspaceSlice.actions;
export const workspaceReducer = workspaceSlice.reducer;