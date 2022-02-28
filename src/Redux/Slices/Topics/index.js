import {getTopics, getSubtopics, getQuestions} from '../../../Axios/Provider';
import {createSlice} from '@reduxjs/toolkit';

export const topicsSlice = createSlice({
  name: 'topics',
  initialState: {
    topicsList: [],
    subtopicsList: [],
    questionsList: [],
  },
  reducers:{
    setTopicsList: (state, action) => {
      state.topicsList = action.payload;
    },
    setSubtopicsList: (state, action) => {
      state.subtopicsList = action.payload;
    },
    setQuestionsList: (state, action) => {
      state.questionsList = action.payload;
    },
    addItemQuestionList: (state, action) => {
      state.questionsList.push(action.payload);
    },
    updateItemQuestionList: (state, action) => {
      state.questionsList = updateItem(state.questionsList, action.payload);
    },
    deleteItemQuestionList: (state, action) => {
      state.questionsList = deleteItem(state.questionsList, action.payload);
    },
    deleteAllSubtopicList: (state) => {
      state.subtopicsList = deleteSubtopicList(state.subtopicsList)
    },
    deleteAllQuestionList: (state) => {
      state.questionsList = deleteQuestionList(state.questionsList)
    },
  }
});


export default topicsSlice.reducer; //to Store

export const {
  setTopicsList, 
  setSubtopicsList,
  setQuestionsList,
  addItemQuestionList, 
  updateItemQuestionList, 
  deleteItemQuestionList, 
  deleteAllQuestionList,
  deleteAllSubtopicList} = topicsSlice.actions;

function updateItem(array, item){
  return array.map(function(element){
    if(element.id === item.id)
      return item;
    return element
  });
}

function deleteItem(array, id) {
  return array.filter(function(element){ 
    return element.id !== id; 
  });
}

function deleteQuestionList(array) {
  while (array.length !== 0)
    array.pop()
  return array
}

function deleteSubtopicList(array) {
  while (array.length !== 0)
    array.pop()
  return array
}

export const acquireTopics = () => async (dispatch) => {
  const response = await getTopics('/topics');
  dispatch(setTopicsList(response.data.topics));  
}
export const acquireSubtopics = (topicID) => async (dispatch) => {
  const response = await getSubtopics(`/topics/${topicID}/subtopics`);
  dispatch(setSubtopicsList(response.data.subtopics));  
}
export const acquireQuestions = (topicID, subtopicID) => async (dispatch) => {
  const response = await getQuestions(`/topics/${topicID}/subtopics/${subtopicID}/questions`);
  dispatch(setQuestionsList(response.data.questions));  
}