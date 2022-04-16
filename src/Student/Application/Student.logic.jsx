import { GetHistory, RegisterDataExam , UpdateDataExam } from "../Infrastructure/Student.service";

export function ExamRegister(matricula, topicID, corrects, incorrects, qualification){
  const data = {
    matricula: matricula,
    topicID: topicID,
    corrects: corrects,
    incorrects: incorrects, 
    qualification: qualification,
  }
  return RegisterDataExam(data);
}

export function ExamUpdate(historyID, topicID, corrects, incorrects, qualification){
  const data = {
    topicID: topicID,
    corrects: corrects,
    incorrects: incorrects, 
    qualification: qualification,
  }
  return UpdateDataExam(historyID, data);
}

export function HistoryGet(matricula, topicID){
  return GetHistory(matricula, topicID);
}