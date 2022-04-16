import { postOne, putOne, getOne } from "../../Axios/Provider";

export function RegisterDataExam(data){
  const body = JSON.stringify(data);
  return postOne('/histories', body);
}

export function UpdateDataExam(historyID, data){
  const body = JSON.stringify(data);
  return putOne(`/histories/${historyID}`, body);
}

export function GetHistory(matricula, topicID){
  return getOne(`/histories/students/${matricula}/topics/${topicID}`);
}