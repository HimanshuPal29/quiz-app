

import Footer from './components/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import StartPage from './components/StartPage';
import QuizPage from './components/QuizPage';
import ResultPage from './components/ResultPage';
import HomePage from './components/HomePage';

function App() {
  return (
    <BrowserRouter>
      <div id="root" style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <div className="page-content" style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/start" element={<StartPage />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="/result" element={<ResultPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;

