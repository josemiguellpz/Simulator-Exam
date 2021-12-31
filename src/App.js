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
import HistorialStudent from "./Student/UI/Historial";

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
        <Route index path="/student/historial" element={<HistorialStudent/>}/>
        <Route path="*" element={<Error/>}/>
      </Routes>
    <Footer/>
    </BrowserRouter>
    </>
  );
}

export default App;
