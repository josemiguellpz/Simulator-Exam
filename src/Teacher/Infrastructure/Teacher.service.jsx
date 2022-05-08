import { postOne, getOne, putOne, deleteOne, putImages } from "../../Axios/Provider";

export function SearchStudents(data){
  return getOne(`/search/students/${data}`)
}

export function RegisterTopic(newTopic){
  const body = JSON.stringify(newTopic);
  return postOne("/topics", body);
}

export function RegisterSubtopic(topicID, subtopic){
  const body = JSON.stringify(subtopic);
  return postOne(`/topics/${topicID}/subtopics`, body);
}

export function RegisterQuestion(topicID, subtopicID, newQuestion){
  const body = JSON.stringify(newQuestion);
  return postOne(`/topics/${topicID}/subtopics/${subtopicID}/questions`, body);
}

export function GetQuestion(topicID, subtopicID, questionID){
  return getOne(`/topics/${topicID}/subtopics/${subtopicID}/questions/${questionID}`);
}

export function UpdateTopicAndSubtopic(topicID, subtopicID, data){
  const body = JSON.stringify(data);
  return putOne(`/topics/${topicID}/subtopics/${subtopicID}`, body);
}

export function UpdateQuestion(newQuestion, topicID, subtopicID, questionID){
  const body = JSON.stringify(newQuestion);
  return putOne(`/topics/${topicID}/subtopics/${subtopicID}/questions/${questionID}`, body);
}

export function UploadImage(questionID, formData){
  return putImages(`/exam/images/${questionID}`, formData);
}

export function DeleteTopic(topicID){
  return deleteOne(`/topics/${topicID}`);
}

export function DeleteSubtopic(topicID, subtopicID){
  return deleteOne(`/topics/${topicID}/subtopics/${subtopicID}`);
}

export function DeleteQuestion(topicID, subtopicID, questionID){
  return deleteOne(`/topics/${topicID}/subtopics/${subtopicID}/questions/${questionID}`);
}

export function DeleteImage(questionID){
  return deleteOne(`/exam/images/${questionID}`);
}

export function GetHistorial(matricula, topicID){
  return getOne(`/histories/students/${matricula}/topics/${topicID}`);
}

export function UpdateStudent(matricula, data){
  const body = JSON.stringify(data);
  return putOne(`/users/${matricula}`, body);
}

export function DeleteStudent(matricula){
  return deleteOne(`/users/${matricula}`);
}