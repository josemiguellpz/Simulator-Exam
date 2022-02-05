// import StudentModel from '../../../Student/Domain/Student.model';
import {getUser} from '../../../Axios/Provider';
import {createSlice} from '@reduxjs/toolkit';

export const usersSlice = createSlice({
  name: 'users',
  initialState:{
    data: {id:0, role: "user", name:"", lastName:"", carrer:""},
  },
  reducers:{
    setDataUser: (state, action) => {
      state.data = action.payload;
    },
  }
});

export default usersSlice.reducer;  //to store

export const { setDataUser } = usersSlice.actions;

export const acquireUser = () => async (dispatch) => {
  const matricula = localStorage.getItem('id');
  const response = await getUser(matricula);
  const {role, name, lastName, carrer} = response.data.info;
  const user = {
    id: matricula,
    role: role,
    name: name,
    lastName: lastName,
    carrer: carrer,
  }
  console.log("RESPONSE: ", user);
  dispatch(setDataUser(user))
}