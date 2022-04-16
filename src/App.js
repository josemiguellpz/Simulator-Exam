import './App.css';
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import NavBar from "./Components/NavBar";
import Footer from "./Components/Footer";

import Home from "./User/UI/Home";
import Topics from "./User/UI/Topics";
import Register from "./User/UI/Register";
import Error from "./User/UI/PageNotFound";

import HomeStudent from "./Student/UI/Home";
import TopicsStudent from "./Student/UI/Topics";
import Exam from "./Student/UI/Exam";
import HistorialStudent from "./Student/UI/Historial";

import HomeTeacher from "./Teacher/UI/Home";
import TopicsUp from "./Teacher/UI/TopicsUp";
import TopicsDown from "./Teacher/UI/TopicsDown";
import TopicsEdit from "./Teacher/UI/TopicsEdit";
import ViewStudents from "./Teacher/UI/ViewStudents";
import Performance from './Teacher/UI/Performance';

function App() {
  return (
    <>
    <BrowserRouter>
    <NavBar/>
      <Routes>
        
        <Route index path="/" element={<Home/>}/>
        <Route index path="/topics" element={<Topics/>}/>
        <Route index path="/register" element={<Register/>}/>

        <Route index path="/student/" element={<HomeStudent/>}/>
        <Route index path="/student/topics" element={<TopicsStudent/>}/>
        <Route index path="/student/topics/exam/t-id=0:topicID/name=:topic" element={<Exam/>}/>
        <Route index path="/student/historial" element={<HistorialStudent/>}/>
        <Route index path="/student/historial/exam/t-id=0:topicID/name=:topic" element={<Exam/>}/>
        
        <Route index path="/teacher/" element={<HomeTeacher/>}/>
        <Route index path="/teacher/topics-up/" element={<TopicsUp/>}/>
        <Route index path="/teacher/topics-down/" element={<TopicsDown/>}/>
        <Route index path="/teacher/topics-edit/" element={<TopicsEdit/>}/>
        <Route index path="/teacher/students/" element={<ViewStudents/>}/>
        <Route index path="/teacher/students/:studentID" element={<Performance/>}/>
        
        <Route path="*" element={<Error/>}/>
      </Routes>
    <Footer/>
    </BrowserRouter>
    </>
  );
}

export default App;
