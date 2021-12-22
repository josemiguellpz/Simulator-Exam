// import { createOne, updateOne, getOne } from "../../Provider.new";

//TODO: PROVIDER and Update User

export function RegisterUser(body){
  console.log(body)
  return {status: true, info: "¡Registro Exitoso! Puede iniciar sesión"}
}

export function GetUser(matricula, password){
  const body = {
    matricula: matricula,
    password: password,
  }
  console.log(body)
  return {status: true, info: "Sesión Iniciada"}
}

export function GetUsers(){
  
}

export function DeleteUser(){

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