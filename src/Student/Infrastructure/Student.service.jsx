import { postOne, putOne } from "../../Axios/Provider";

export function RegisterDataExam(data){
  const body = JSON.stringify(data);
  return postOne('/histories', body);
}

export function UpdateDataExam(historyID, data){
  const body = JSON.stringify(data);
  return putOne(`/histories/${historyID}`, body);
}