import {createSlice} from '@reduxjs/toolkit';

// Slice

const initialState = {
  enrolledCourses: [],
};

const slice = createSlice({
  name: 'EnrolledCourses',
  initialState,
  reducers: {
    setEnrolledCourses: (state, action) => {
      state.enrolledCourses = action.payload;
    },
    clearEnrolledCourses: (state, action) => {
      state.enrolledCourses = [];
    },
  },
});

export default slice.reducer;

// Actions

export const {setEnrolledCourses, clearEnrolledCourses} = slice.actions;

// Selectors

export const getEnrolledCourses = state =>
  state.MyCourseReducer.enrolledCourses;
