import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Home/Login';
import Register from './pages/Home/Register';


function App() {
  return (
    <Router>
        <Routes>
        <Route index element={<Home />}></Route> 
        <Route path="/Login" index element={<Login/>}></Route>
        <Route path="/Register" index element={<Register/>}></Route>
        
    </Routes>
    </Router>
  );
}

export default App;
