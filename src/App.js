import './App.css';
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import NavBar from "./Components/NavBar";

import Home from "./User/UI/Home";
import Topics from "./User/UI/Topics";
import Register from "./User/UI/Register";

function App() {
  return (
    <>
    <BrowserRouter>
    <NavBar/>
      <Routes>
        <Route index path="/" element={<Home/>}/>
        <Route index path="/topics" element={<Topics/>}/>
        <Route index path="/register" element={<Register/>}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
