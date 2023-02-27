import { Routes, Route } from "react-router-dom";
import AddCity from "./pages/AddCity";
import Home from "./pages/Home";
import Weather from "./pages/Weather";
import "./styles/Home.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddCity />} />
        <Route path="/weather/:city" element={<Weather />} />
      </Routes>
    </div>
  );
}

export default App;
