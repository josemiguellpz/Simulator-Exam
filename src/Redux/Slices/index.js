import {getUser, getUsers, getTopics, getSubtopics, getQuestions, getOne} from '../../Axios/Provider';
import {createSlice} from '@reduxjs/toolkit';

export const Slices = createSlice({
  name: 'slices',
  initialState: {
    user: {role: "user",},
    usersList: [],
    topicsList: [],
    subtopicsList: [],
    questionsList: [],
    exam: [],
    answers: [],
  },
  reducers:{
    /* Methods for User */
    setUser: (state, action) => {
      state.user = action.payload;
    },
    deleteUser: (state) => {
      state.user = {role:"user"};
    },
    setUsers: (state, action) => {
      state.usersList = action.payload;
    },
    
    /* Methods for Topics */
    setTopicsList: (state, action) => {
      state.topicsList = action.payload;
    },
    setSubtopicsList: (state, action) => {
      state.subtopicsList = action.payload;
    },
    deleteAllTopicList: (state) => {
      state.subtopicsList = [];
    },
    deleteAllSubtopicList: (state) => {
      state.subtopicsList = deleteSubtopicList(state.subtopicsList);
    },

    /* Methods for Questions */
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
    deleteAllQuestionList: (state) => {
      state.questionsList = deleteQuestionList(state.questionsList);
    },
    
    /* Methods for Exam */
    setExam: (state, action) => {
      state.exam = action.payload;
    },
    deleteExam: (state) => {
      state.exam = [];
    },
    setAnswers: (state, action) => {
      state.answers = action.payload;
    },
    deleteAnswers: (state) => {
      state.answers = [];
    },
  }
});


export default Slices.reducer; //to Store

export const {
  setUser,
  setUsers,
  setTopicsList,
  setSubtopicsList,
  setQuestionsList,
  setExam,
  setAnswers,
  addItemQuestionList,
  updateItemQuestionList,
  deleteUser,
  deleteItemQuestionList,
  deleteAllTopicList,
  deleteAllQuestionList,
  deleteAllSubtopicList,
  deleteExam,
  deleteAnswers,
} = Slices.actions;

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

export const acquireUser = (matricula) => async (dispatch) => {
  const response = await getUser(matricula);
  dispatch(setUser(response.data.user));
}

export const acquireUsers = () => async (dispatch) => {
  const response = await getUsers();
  dispatch(setUsers(response.data.users));
}

export const acquireAllTopics = () => async (dispatch) => {
  const response = await getOne('/getTopics');
  dispatch(setTopicsList(response.data.topics));  
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

export const acquireExam = (topicID) => async (dispatch) => {
  const response = await getOne(`/exam/${topicID}`);
  dispatch(setExam(response.data.exam));
  const data = response.data.exam;
  let array = [];
  data.forEach(element => {
    /* Alter Answers */
    const {correct, incorrect1, incorrect2, incorrect3} = element;
    let w = Math.round(Math.random() * (3 - 0) + 0);
    let item = []
    item.push(incorrect3, incorrect1, incorrect2);
    if(w === 0)
      item.unshift(correct)
    if(w === 1){
      let aux = correct
      item[3] = item[2]
      item[2] = item[1]
      item[1] = aux
    }
    if(w === 2){
      let aux = correct
      item[3] = item[2]
      item[2] = aux
    }
    if(w === 3)
      item.push(correct)
    array.push(item);
  });
  dispatch(setAnswers(array));
}