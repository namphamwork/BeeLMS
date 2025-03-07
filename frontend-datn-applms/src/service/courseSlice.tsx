import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
// import type { RootState } from "../store";

interface CourseState {
  _id:string
}

const initialState: CourseState = {
  _id: "",
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    startEditCourse: (state, { payload }: PayloadAction<CourseState>) => {
      state._id = payload._id;
    },
    cancelEditCourse: (state) => {
      state._id = "";
    }
  },
});

export const { startEditCourse, cancelEditCourse } = courseSlice.actions;

const courseReducer = courseSlice.reducer;

export default courseReducer;


// export const selectCurrentUser = (state: RootState) => state.auth.user;
