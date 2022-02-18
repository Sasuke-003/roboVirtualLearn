import {createSlice} from '@reduxjs/toolkit';
import {colors} from '../../assets';
// Slice

const initialState = {
  questionAnswer: [],
  showModal: false,
};

const QuestionAnswerSlice = createSlice({
  name: 'QuestionAnswer',
  initialState,
  reducers: {
    setQuestionAnswer: (state, action) => {
      const data = action.payload;
      const existingIndex = state.questionAnswer.findIndex(
        question => question.order === data.order,
      );

      if (existingIndex >= 0) {
        const updatedQuestionAnswer = [...state.questionAnswer];
        updatedQuestionAnswer[existingIndex].userAnswer = data.userAnswer;
        updatedQuestionAnswer[existingIndex].type = data.type;
        state.questionAnswer = updatedQuestionAnswer;
      } else {
        state.questionAnswer.push(data);
      }
    },

    clearQuestionAnswer: (state, action) => {
      state.questionAnswer = [];
    },
    setModalVisible: (state, action) => {
      state.showModal = action.payload;
    },
  },
});

export default QuestionAnswerSlice.reducer;

// Actions

export const {setQuestionAnswer, clearQuestionAnswer, setModalVisible} =
  QuestionAnswerSlice.actions;

// Selectors
export const getQuestionAnswer = state =>
  state.questionAnswerReducer.questionAnswer;
export const getShowModal = state => state.questionAnswerReducer.showModal;
