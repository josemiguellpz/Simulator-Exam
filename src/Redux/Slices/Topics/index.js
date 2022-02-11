import {getTopics} from '../../../Axios/Provider';
import {createSlice} from '@reduxjs/toolkit';

export const topicsSlice = createSlice({
  name: 'topics',
  initialState: {
    topicsList: [],
    questionsList: [],
  },
  reducers:{
    setTopicsList: (state, action) => {
      state.topicsList = action.payload;
    },
    updateQuestionList: (state, action) => {
      state.questionsList.push(action.payload);
    }
  }
});

export default topicsSlice.reducer; //to Store

export const {setTopicsList, updateQuestionList} = topicsSlice.actions;

export const acquireTopics = () => async (dispatch) => {
  const response = await getTopics('/topics');
  dispatch(setTopicsList(response.data.topics));  
}