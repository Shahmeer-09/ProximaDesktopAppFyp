import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type BaseFields = {
  id: string;
  name: string;
  createdAt: Date;
  workspaceId: string;
};

type Count = {
  _count: {
    video: number;
  };
};

type Folders = BaseFields & Count;

type FolderProps = { folders: Folders[] };

const initialState: FolderProps = {
  folders: [],
};
const folderSlice = createSlice({
  name: "folders",
  initialState,
  reducers: {
    FOLDERS: (state, action: PayloadAction<FolderProps>) => {
      return { ...action.payload };
    },
  },
});

export const { FOLDERS } = folderSlice.actions;
export const folderReducer = folderSlice.reducer;
