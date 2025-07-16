import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function ResultPage() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const score = state?.score || 0;
  const total = state?.total || 1;
  const timeTaken = state?.timeTaken || 0; // in seconds

  const accuracy = ((score / total) * 100).toFixed(2);
  const avgTimePerQ = (timeTaken / total).toFixed(1);

  return (
    <div className="container result-summary">
      <div className="emoji">🎉</div>
      <h2>Quiz Complete!</h2>
      <p><strong>Score:</strong> {score} / {total}</p>
      <p><strong>Total Time:</strong> {timeTaken} seconds</p>
      <p><strong>Avg Time / Question:</strong> {avgTimePerQ} sec</p>
      <p><strong>Accuracy:</strong> {accuracy}%</p>
      <button onClick={() => navigate('/')}>🔁 Try Again</button>
    </div>
  );
}

export default ResultPage;