import {postOne, getUser, getTopics} from '../../Axios/Provider';

export function RegisterUser(data){
  const body = JSON.stringify(data);
  return postOne("users", body)
}

export function GetUser(matricula, password){
  const body = JSON.stringify(password)
  return getUser(matricula, body)
}

export function GetUsers(){
  
}

export function DeleteUser(){

}

export function GetTopics(){
  return getTopics('/topics')
}

/* export function DeleteVetService(id, password) {
  return updateOne("delete", id, { password });
}

export function ResetVetPasswordService(id, password) {
  return updateOne("vets/reset", id, { password });
}

export function UpdateVetInfoService(id, address, license, name, phone) {
  const data = {
    address,
    license,
    name,
    phone,
  };
  return updateOne("vets", id, data);
}

export function GetVetInfoService(id) {
  return getOne("vets", id);
}

export function RegisterVetService(vetModel, password) {
  const body = { ...vetModel, password };
  return createOne("vets", body);
} */