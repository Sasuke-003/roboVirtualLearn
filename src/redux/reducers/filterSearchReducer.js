import {createSlice} from '@reduxjs/toolkit';
import {colors} from '../../assets';
// Slice

const initialState = {
  showSearchModal: false,
  filteredCourses: [],
  category: [],
  chapters: [],
  onSelected: [],
};

const FilterSlice = createSlice({
  name: 'FilterSearch',
  initialState,
  reducers: {
    showSearchScreenModal: (state, action) => {
      state.showSearchModal = action.payload;
    },
    setCategories: (state, action) => {
      const existingIndex = state.category.findIndex(
        CategoryId => CategoryId === action.payload,
      );

      if (existingIndex >= 0) {
        state.category.splice(existingIndex, 1);
      } else {
        state.category.push(action.payload);
      }
    },

    setChapters: (state, action) => {
      const existingIndex = state.chapters.findIndex(
        ChapterId => ChapterId === action.payload,
      );

      if (existingIndex >= 0) {
        const updatedChapters = [...state.chapters];
        updatedChapters.splice(existingIndex, 1);
        state.chapters = updatedChapters;
      } else {
        state.chapters = state.chapters.concat([...action.payload]);
      }
      // console.log(state.chapters);
    },
    clearFilter: (state, action) => {
      state.chapters = [];
      state.category = [];
      state.filteredCourses = [];
    },
    setFilteredCourses: (state, action) => {
      state.filteredCourses = action.payload;
    },
  },
});

export default FilterSlice.reducer;

// Actions

export const {
  setCategories,
  setChapters,
  clearFilter,
  setFilteredCourses,
  showSearchScreenModal,
  setSelectedValue,
} = FilterSlice.actions;

// Selectors
export const getChapters = state => state.filterSearchReducer.chapters;

export const getCategory = state => state.filterSearchReducer.category;
export const getFilteredCourses = state =>
  state.filterSearchReducer.filteredCourses;
export const getShowSearchModal = state =>
  state.filterSearchReducer.showSearchModal;
