import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { MyContext } from './MyContext';
import Home from './pages/Home';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <MyContext.Provider value={{}}>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </Router>
      </MyContext.Provider>
    </div>
  );
}

export default App;
