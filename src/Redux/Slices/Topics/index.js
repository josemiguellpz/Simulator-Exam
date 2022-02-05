import {getTopics} from '../../../Axios/Provider';
import {createSlice} from '@reduxjs/toolkit';

export const topicsSlice = createSlice({
  name: 'topics',
  initialState: {
    topicsList: []
  },
  reducers:{
    setTopicsList: (state, action) => {
      state.topicsList = action.payload;
    }
  }
});

export default topicsSlice.reducer; //to Store

export const {setTopicsList} = topicsSlice.actions;

export const acquireTopics = () => async (dispatch) => {
  const response = await getTopics('/topics');
  dispatch(setTopicsList(response.data.topics));  
}