import { postOne, getOne, putOne, deleteOne } from "../../Axios/Provider";

export function RegisterTopic(newTopic){
  const body = JSON.stringify(newTopic);
  return postOne("/topics", body);
}

export function DeleteTopic(topicID){
  return deleteOne(`/topics/${topicID}`);
}

export function RegisterSubtopic(topicID, subtopic){
  const body = JSON.stringify(subtopic);
  return postOne(`/topics/${topicID}/subtopics`, body);
}

export function DeleteSubtopic(topicID, subtopicID){
  return deleteOne(`/topics/${topicID}/subtopics/${subtopicID}`);
}

export function RegisterQuestion(topicID, subtopicID, newQuestion){
  const body = JSON.stringify(newQuestion);
  return postOne(`/topics/${topicID}/subtopics/${subtopicID}/questions`, body);
}

export function GetQuestion(topicID, subtopicID, questionID){
  return getOne(`/topics/${topicID}/subtopics/${subtopicID}/questions/${questionID}`);
}

export function UpdateQuestion(newQuestion, topicID, subtopicID, questionID){
  const body = JSON.stringify(newQuestion);
  return putOne(`/topics/${topicID}/subtopics/${subtopicID}/questions/${questionID}`, body);
}

export function DeleteQuestion(topicID, subtopicID, questionID){
  return deleteOne(`/topics/${topicID}/subtopics/${subtopicID}/questions/${questionID}`);
}
