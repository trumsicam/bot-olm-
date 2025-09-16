import React, { useState } from "react";
import "./App.css";

function App() {
  const [url, setUrl] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setAnswer("");
    const res = await fetch("http://localhost:5000/solve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url }),
    });
    const data = await res.json();
    setAnswer(data.answer);
    setLoading(false);
  };

  return (
    <div className="olm-container">
      <header className="olm-header">
        <img src="https://olm.vn/assets/images/logo.png" alt="OLM Bot" className="olm-logo" />
        <h1>Bot Giải Bài Tập OLM</h1>
        <p>Chỉ cần dán link bài tập OLM, bot sẽ tự động giải!</p>
      </header>
      <main className="olm-main">
        <form className="olm-form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="olm-input"
            placeholder="Dán link bài tập OLM vào đây..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
            autoFocus
          />
          <button type="submit" className="olm-btn">Giải bài tập</button>
        </form>
        <div className="olm-result">
          {loading ? (
            <div className="olm-loading">Đang giải...</div>
          ) : (
            answer && (
              <div>
                <h3>Đáp án:</h3>
                <div className="olm-answer">{answer}</div>
              </div>
            )
          )}
        </div>
      </main>
      <footer className="olm-footer">
        <span>© 2025 Bot Giải Bài Tập OLM | Phiên bản thử nghiệm</span>
      </footer>
    </div>
  );
}

export default App;