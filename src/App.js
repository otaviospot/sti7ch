import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { MyContext } from "./MyContext";
import Home from "./pages/Home";
import Header from "./components/Header";
import About from "./pages/About";
import Methodology from "./pages/Methodology";

function App() {
  return (
    <div className="App">
      <MyContext.Provider value={{}}>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/methodology" element={<Methodology />} />
          </Routes>
        </Router>
      </MyContext.Provider>
    </div>
  );
}

export default App;
