import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';


function HomePage() {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('quiz-history');
    if (stored) {
      setHistory(JSON.parse(stored));
    }
  }, []);

  const averageScore = history.length
    ? (history.reduce((acc, val) => acc + val.score, 0) / history.length).toFixed(2)
    : 0;

  const handleClearHistory = () => {
    localStorage.removeItem('quiz-history');
    setHistory([]);
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h2>📊 Quiz Dashboard</h2>

        {history.length === 0 ? (
          <p>No past attempts found.</p>
        ) : (
          <>
            <p><strong>Total Attempts:</strong> {history.length}</p>
            <p><strong>Average Score:</strong> {averageScore}</p>

            <table style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f2f2f2' }}>
                  <th>Date</th>
                  <th>Score</th>
                  <th>Accuracy</th>
                  <th>Time Taken</th>
                </tr>
              </thead>
              <tbody>
                {history.map((entry, idx) => (
                  <tr key={idx}>
                    <td>{entry.date}</td>
                    <td>{entry.score} / {entry.total}</td>
                    <td>{((entry.score / entry.total) * 100).toFixed(2)}%</td>
                    <td>{entry.timeTaken}s</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}

        <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
          <button onClick={() => navigate('/start')}>🚀 Start New Quiz</button>
          <button
            onClick={handleClearHistory}
            disabled={history.length === 0}
            style={{
              background: history.length === 0 ? "#ddd" : "#fad6d6",
              color: "#a22",
              cursor: history.length === 0 ? "not-allowed" : "pointer"
            }}
          >
            🗑️ Clear History
          </button>
        </div>
      </div>
    </>
  );
}

export default HomePage;

