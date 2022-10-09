import './App.css';
import Home from './components/Home';
import Liked from './components/Liked';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/liked" element={<Liked />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
