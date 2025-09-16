import React, { useState } from "react";
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
    <div style={{ maxWidth: 500, margin: "auto", padding: 32 }}>
      <h2>Bot Giải Bài Tập Tự Động</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Dán link bài tập vào đây..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{ width: "80%", marginRight: 8 }}
          required
        />
        <button type="submit">Giải</button>
      </form>
      <div style={{ marginTop: 32 }}>
        {loading ? "Đang giải..." : <b>Đáp án: {answer}</b>}
      </div>
    </div>
  );
}
export default App;