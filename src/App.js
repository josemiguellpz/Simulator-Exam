import './App.css';
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import NavBar from "./Components/NavBar";

import Home from "./User/UI/Home";

function App() {
  return (
    <>
    <NavBar/>
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Home/>}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
