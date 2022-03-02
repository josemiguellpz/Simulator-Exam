import {RegisterTopic, DeleteTopic, RegisterSubtopic, DeleteSubtopic, RegisterQuestion, GetQuestion, DeleteQuestion, UpdateQuestion, UpdateTopicAndSubtopic} from '../Infrastructure/Teacher.service';

export function TopicRegister({topic, subtopic}){
  if(topic === ""){
    const response = {
      data: {
        status: false, 
        info: "Indique el nombre del tema.", 
        ids: null
      }
    }
    return response 
  }
  if(subtopic === ""){
    const response = {
      data: {
        status: false, 
        info: "Indique el nombre del subtema.", 
        ids: null
      }
    }
    return response 
  }  
  const newTopic = {'topic': topic,'subtopic': subtopic, }
  return RegisterTopic(newTopic);
}

export function TopicDelete(topicID){
  return DeleteTopic(topicID);
}

export function SubtopicRegister(currentTopic, currentSubtopic){
  if(Object.keys(currentTopic).length === 0){
    const response = {
      data: {
        status: false,
        info: "Seleccione el tema asociado."
      }
    }
    return response
  }
  if(currentSubtopic.subtopic === ""){
    const response = {
      data: {
        status: false,
        info: "Indique el nombre del subtema."
      }
    }
    return response
  }
  const {topicID, topic} = currentTopic;
  const {subtopic} = currentSubtopic;
  const request = {
    topic: topic,
    subtopic: subtopic,
  };
  return RegisterSubtopic(topicID, request);
}

export function SubtopicDelete(topicID, subtopicID){
  return DeleteSubtopic(topicID, subtopicID);
}

export function TopicAndSubtopicUpdate(newTopic){
  if(newTopic.topic === ""){
    const response = {
      data: {
        status: false, 
        info: "El tema no puede quedar en blanco.", 
        ids: null
      }
    }
    return response 
  }
  if(newTopic.subtopic === ""){
    const response = {
      data: {
        status: false, 
        info: "El subtema no puede quedar en blanco.", 
        ids: null
      }
    }
    return response 
  }
  const {topicID, subtopicID} = newTopic;
  const data = {
    topic: newTopic.topic,
    subtopic: newTopic.subtopic,
  }
  return UpdateTopicAndSubtopic(topicID, subtopicID, data);
}

export function QuestionRegister(currentTopic, newQuestion){
  const {question, correct, incorrect1, incorrect2, incorrect3, argument} = newQuestion
  if(question === ""){
    const response = {
      data: {
        status: false, 
        info: "Indique la pregunta.", 
      }
    }
    return response 
  }  

  if(correct === ""){
    const response = {
      data: {
        status: false, 
        info: "Indique la respuesta correcta.", 
      }
    }
    return response 
  }  

  if(incorrect1 === ""){
    const response = {
      data: {
        status: false, 
        info: "Indique la respuesta incorrecta.", 
      }
    }
    return response 
  }  
  
  if(incorrect2 === ""){
    const response = {
      data: {
        status: false, 
        info: "Indique la respuesta incorrecta.", 
      }
    }
    return response 
  }  
  
  if(incorrect3 === ""){
    const response = {
      data: {
        status: false, 
        info: "Indique la respuesta incorrecta.", 
      }
    }
    return response 
  }  
  
  if(argument === ""){
    const response = {
      data: {
        status: false, 
        info: "Indique el argumento.", 
      }
    }
    return response 
  }  

  const {topicID, subtopicID} = currentTopic;
  return RegisterQuestion(topicID, subtopicID, newQuestion);
}

export function QuestionGet(topicID, subtopicID, questionID){
  return GetQuestion(topicID, subtopicID, questionID);
}

export function QuestionUpdate(newQuestion, topicID, subtopicID, questionID){
  return UpdateQuestion(newQuestion, topicID, subtopicID, questionID);
}

export function QuestionDelete(topicID, subtopicID, questionID){
  return DeleteQuestion(topicID, subtopicID, questionID);
}