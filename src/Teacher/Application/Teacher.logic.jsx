


export function TopicRegister({topic, subtopic}){
  if(topic === "")
    return {status: false, info: "Indique el nombre del tema."}
  
  if(subtopic === "")
    return {status: false, info: "Indique el nombre del subtema."}

  return {status: true, info:"¡Tema registrado!"}
}

export function QuestionRegister({question, correct, incorrect1, incorrect2, incorrect3, argument}){
  if(question === "")
    return {status: false, info: "Indique la pregunta."}

  if(correct === "")
    return {status: false, info: "Indique la respuesta correcta."}

  if(incorrect1 === "")
    return {status: false, info: "Indique la respuesta incorrecta."}
  
  if(incorrect2 === "")
    return {status: false, info: "Indique la respuesta incorrecta."}
  
  if(incorrect3 === "")
    return {status: false, info: "Indique la respuesta incorrecta."}
  
  if(argument === "")
    return {status: false, info: "Indique el argumento."}

  const id = Math.floor(Math.random() * 100);
  return {status: true, info:"¡Pregunta registrada!", quest: {'id': id, 'quest': question}}
}