import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function StartPage() {
  const [number, setNumber] = useState(5);
  const [category, setCategory] = useState(9);
  const [difficulty, setDifficulty] = useState("easy");
  const navigate = useNavigate();

  const handleStart = () => {
    navigate(`/quiz?number=${number}&category=${category}&difficulty=${difficulty}`);
  };

  return (
    <div className="container">
      <h2> Setup Your Quiz</h2>
      <label>No. of Questions:</label>
      <select value={number} onChange={(e) => setNumber(Number(e.target.value))}>
        {[5, 10, 15].map(n => <option key={n}>{n}</option>)}
      </select>

      <label>Category:</label>
      <select value={category} onChange={(e) => setCategory(Number(e.target.value))}>
        <option value={9}>General Knowledge</option>
        <option value={18}>Computers</option>
        <option value={11}>Film</option>
      </select>

      <label>Difficulty:</label>
      <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>

      <button onClick={handleStart}> Start Quiz</button>
    </div>
  );
}

export default StartPage;
