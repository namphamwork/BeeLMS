import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Classroom } from "../types/Classroom";

interface ClassroomState {
    classroomData: Classroom | null;
  }
  
  const initialState: ClassroomState = {
    classroomData: null,
  };
  

const classroomSlice = createSlice({
  name: "classroom",
  initialState,
  reducers: {
    setClassroomData: (state, action: PayloadAction<Classroom>) => {
      state.classroomData = action.payload;
    },
  },
});

export const { setClassroomData } = classroomSlice.actions;

export const selectClassroomData = (state: { classroom: ClassroomState }) =>
  state.classroom.classroomData;

export default classroomSlice.reducer;
