/*

import React, { useState, useEffect } from "react";
import axios from "axios";

const Quiz = () => {
  const [username, setUsername] = useState("");
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(30 * 60);
  const [finished, setFinished] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:5000/api/quiz")
      .then(res => setQuestions(res.data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    if (time <= 0) {
      handleSubmit();
      return;
    }
    const timer = setInterval(() => setTime(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [time]);

  const handleNext = () => {
    if (!selected) return;
    if (selected === questions[current].correctAnswer) setScore(prev => prev + 1);
    setSelected(null);
    if (current + 1 < questions.length) setCurrent(prev => prev + 1);
    else handleSubmit();
  };

  const handleSubmit = () => {
    setFinished(true);
    if (!submitted && username) {
      axios.post("http://localhost:5000/api/quiz/result", { username, score })
        .then(() => setSubmitted(true))
        .catch(err => console.error(err));
    }
  };

  const formatTime = (s) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  if (!username) {
    return (
      <div>
        <h2>Enter your name to start:</h2>
        <input value={username} onChange={(e) => setUsername(e.target.value)} />
        <button onClick={() => username && setUsername(username)}>Start Quiz</button>
      </div>
    );
  }

  if (!questions.length) return <h2>Loading...</h2>;

  if (finished) return <h2>Quiz Finished! Score: {score}/{questions.length}</h2>;

  const q = questions[current];

  return (
    <div>
      <h2>Time Left: {formatTime(time)}</h2>
      <h3>{q.question}</h3>
      <ul>
        {q.options.map((opt, i) => (
          <li key={i}>
            <input
              type="radio"
              name="option"
              checked={selected === opt}
              onChange={() => setSelected(opt)}
            />
            <label>{opt}</label>
          </li>
        ))}
      </ul>
      <button onClick={handleNext}>Next</button>
    </div>
  );
};

export default Quiz;


*/


import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Quiz.css"; // Importing external CSS

const Quiz = () => {
  const [username, setUsername] = useState("");
  const [usernameInput, setUsernameInput] = useState("");
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [time, setTime] = useState(30 * 60);
  const [finished, setFinished] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:5000/api/quiz")
      .then(res => setQuestions(res.data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    if (time <= 0) {
      handleSubmit();
      return;
    }
    const timer = setInterval(() => setTime(prev => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [time]);

  const handleNext = () => {
    if (!selected) ;
    if (selected === questions[current].correctAnswer) setScore(prev => prev + 1);
    setSelected(null);
    if (current + 1 < questions.length) setCurrent(prev => prev + 1);
    else handleSubmit();
  };

  const handleSubmit = () => {
    setFinished(true);
    if (!submitted && username) {
      axios.post("http://localhost:5000/api/quiz/result", { username, score })
        .then(() => setSubmitted(true))
        .catch(err => console.error(err));
    }
  };

  const formatTime = (s) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

 // Calculate progress percentage
  const progressPercent = questions.length ? ((current + 1) / questions.length) * 100 : 0;



  if (!username) {
    return (
      <div className="quiz-page">
        <div className="quiz-card">
          <h2>Enter your name to start:</h2>
          <input
            className="quiz-input"
            value={usernameInput}
            placeholder="username..."
            onChange={(e) => setUsernameInput(e.target.value)}
          />
          <button
            className="quiz-button"
            onClick={() => usernameInput && setUsername(usernameInput)}
            
          >
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  if (!questions.length)
    return <div className="quiz-page"><h2>Loading...</h2></div>;

  if (finished) {
    return (
      <div className="quiz-page">
        <div className="quiz-card">
          <h2>Quiz Finished!</h2>
          <p>Score: {score}/{questions.length}</p>
        </div>
      </div>
    );
  }

  const q = questions[current];

  return (
    <div className="quiz-page">
      <div className="quiz-card">
        <h2>Time Left: {formatTime(time)}</h2>
       
         {/* Progress Bar */}
        <div className="progress-container">
          <div
            className="progress-bar"
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
        <p>{current + 1} / {questions.length}</p>


        <h2>{q.question}</h2>
        <ul>
          {q.options.map((opt, i) => (
            <li key={i}>
              <label>
                <input
                  type="radio"
                  name="option"
                  checked={selected === opt}
                  onChange={() => setSelected(opt)}
                />
                {opt}
              </label>
            </li>
          ))}
        </ul>

       {/* ✅ Clear Answer Button */}
        <button className="quiz-button" onClick={() => setSelected(null)}>
         Clear
        </button>
        
        <button className="quiz-button" onClick={handleNext}>
          Next
        </button>
      </div>
    </div>
  );
};

export default Quiz;
