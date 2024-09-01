'use client';

import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';

const YouTubeSummary = () => {
  const [url, setUrl] = useState('');
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const extractYouTubeId = (url) => {
    const regex = /[?&]v=([^&#]*)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSummary(null);

    const youtubeId = extractYouTubeId(url);
    if (!youtubeId) {
      setError('유효한 YouTube URL을 입력하세요.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/youtube/", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ video_id : youtubeId }),
      });

      if (!response.ok) {
        throw new Error("서버에서 오류가 발생했습니다.");
      }

      const data = await response.json();
      setSummary(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5">
      <form onSubmit={handleSubmit} className="flex flex-col mb-4 items-center">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="YouTube URL을 입력하세요"
          className="border rounded p-2 w-full bg-white text-black dark:bg-black dark:text-white dark:border-gray-600"
          required
        />
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
        >
          요약 요청
        </button>
      </form>

      {loading && <div>로딩 중...</div>}
      {error && <div className="text-red-500">{error}</div>}
      {summary && (
        <div className="mt-4">
          <h2 className="text-xl font-bold">{summary.title}</h2>
          <ReactMarkdown>{summary.summary}</ReactMarkdown> {/* Markdown 렌더링 */}
        </div>
      )}
    </div>
  );
};

export default YouTubeSummary;
