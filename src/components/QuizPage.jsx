import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

function QuizPage() {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState(15); // 15 seconds per question
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Fetch questions from API
  useEffect(() => {
    const fetchQuestions = async () => {
      const amount = searchParams.get('number');
      const category = searchParams.get('category');
      const difficulty = searchParams.get('difficulty');

      const url = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=multiple`;
      const res = await fetch(url);
      const data = await res.json();

      const formatted = data.results.map(q => {
        const options = [...q.incorrect_answers];
        const index = Math.floor(Math.random() * 4);
        options.splice(index, 0, q.correct_answer);
        return {
          question: q.question,
          options,
          correct: q.correct_answer,
        };
      });

      setQuestions(formatted);
    };

    fetchQuestions();
  }, [searchParams]);

  // Timer logic
  useEffect(() => {
    if (questions.length === 0) return;

    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev === 1) {
          clearInterval(interval);
          handleNext(true); // auto move
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval); // clear on unmount/change
  }, [current, questions]);

  // Reset timer on next question
  useEffect(() => {
    setTimer(15);
  }, [current]);

  const handleNext = (auto = false) => {
    if (!auto && selected === questions[current].correct) {
      setScore(prev => prev + 1);
    }

    if (auto && selected === questions[current].correct) {
      setScore(prev => prev + 1);
    }

    if (current < questions.length - 1) {
      setSelected(null);
      setCurrent(prev => prev + 1);
    } else {
      handleFinish();
    }
  };

  const handlePrev = () => {
    if (current > 0) {
      setSelected(null);
      setCurrent(prev => prev - 1);
    }
  };

  const handleFinish = () => {
    const finalScore = selected === questions[current].correct ? score + 1 : score;

    const newEntry = {
      score: finalScore,
      total: questions.length,
      timeTaken: questions.length * 15 - timer,
      date: new Date().toLocaleString()
    };

    const prev = JSON.parse(localStorage.getItem('quiz-history')) || [];
    localStorage.setItem('quiz-history', JSON.stringify([newEntry, ...prev]));

    navigate('/result', {
      state: newEntry
    });
  };

  if (questions.length === 0) return <p className="container">Loading...</p>;

  return (
    <div className="container">
      <h3 style={{ textAlign: 'right', marginBottom: '10px' }}>
        Question {current + 1} / {questions.length}
      </h3>
      <h3 dangerouslySetInnerHTML={{ __html: questions[current].question }} />
      <p style={{ fontWeight: 'bold', color: '#e63946' }}>⏳ Time Left: {timer} sec</p>

      {questions[current].options.map((opt, i) => {
        const label = String.fromCharCode(65 + i); // A, B, C, D
        return (
          <button
            key={i}
            className={`option-btn ${selected === opt ? 'selected' : ''}`}
            onClick={() => setSelected(opt)}
            data-label={label + '.'}
            dangerouslySetInnerHTML={{ __html: opt }}
          />
        );
      })}

      <div className="nav-btns">
        <button onClick={handlePrev} disabled={current === 0}>⬅️ Previous</button>
        {current === questions.length - 1 ? (
          <button onClick={handleFinish}>✅ Submit</button>
        ) : (
          <button onClick={() => handleNext(false)} disabled={selected === null}>➡️ Next</button>
        )}
      </div>
    </div>
  );
}

export default QuizPage;
