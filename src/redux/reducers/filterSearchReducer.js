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
      const id = action.payload;

      const existingIndex = state.category.findIndex(
        CategoryId => CategoryId === id,
      );

      if (existingIndex >= 0) {
        const updatedCategory = [...state.category];
        updatedCategory.splice(existingIndex, 1);

        state.category = updatedCategory;
      } else {
        state.category = state.category.concat(action.payload);
      }
    },

    setChapters: (state, action) => {
      const id = action.payload;

      const existingIndex = state.chapters.findIndex(
        ChapterId => ChapterId === id,
      );

      if (existingIndex >= 0) {
        const updatedChapters = [...state.chapters];
        updatedChapters.splice(existingIndex, 1);
        state.chapters = updatedChapters;
      } else {
        state.chapters = state.chapters.concat(action.payload);
      }
    },
    clearFilter: (state, action) => {
      state.chapters = [];
      state.category = [];
      state.filteredCourses = [];
      state.bgColor = null;
    },
    setFilteredCourses: (state, action) => {
      state.filteredCourses = action.payload;
    },

    // added
    setSelectedValue: (state, action) => {
      const existingIndex = state.onSelected.findIndex(
        Chapter => Chapter.id === action.payload,
      );
      if (existingIndex >= 0) {
        console.log(state.onSelected[existingIndex].selected);
        state.onSelected[existingIndex].selected =
          !state.onSelected[existingIndex].selected;
      } else {
        state.onSelected.push({id: action.payload, selected: true});
      }
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
export const getSelectedValue = state => state.filterSearchReducer.onSelected;
export const getCategory = state => state.filterSearchReducer.category;
export const getFilteredCourses = state =>
  state.filterSearchReducer.filteredCourses;
export const getShowSearchModal = state =>
  state.filterSearchReducer.showSearchModal;
