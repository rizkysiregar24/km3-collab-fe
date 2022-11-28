import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"
import User from './pages/User';

function App() {  
  return (
    <Router>
        <Routes>
        <Route index element={<Home />}/>  
        <Route path="/user"element={<User />}/>
    </Routes>
    </Router>
  );
}

export default App;
