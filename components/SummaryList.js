'use client';

import React, { useEffect, useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';

const SummaryList = () => {
  const [summaries, setSummaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const dialogRef = useRef(null);
  const [selectedVideo, setSelectedVideo] = useState(null);

  // 데이터 가져오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/youtube/");
        const data = await response.json();
        setSummaries(data);
      } catch (error) {
        console.error("데이터를 가져오는 중 오류 발생:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleOpenDialog = (video) => {
    setSelectedVideo(video);
    dialogRef.current.showModal();
  };

  const handleCloseDialog = () => {
    dialogRef.current.close();
    setSelectedVideo(null);
  };

  if (loading) {
    return <div>로딩 중...</div>;
  }

  return (
    <div className="flex flex-wrap justify-center p-5">
      {summaries.map((video, index) => (
        <div
          key={index}
          className="m-2 cursor-pointer w-48"
          onClick={() => handleOpenDialog(video)}
        >
          <img 
            src={video.thumbnail_url} 
            alt={video.title} 
            className="w-full h-28 object-cover rounded-lg" 
          />
          <h3 className="text-center mt-2 text-lg">{video.title}</h3>
        </div>
      ))}

      <dialog ref={dialogRef} className="rounded-lg p-5">
        {selectedVideo && (
          <>
            <h2 className="text-xl font-bold">{selectedVideo.title}</h2>
            <div className="mt-2">
              <ReactMarkdown>{selectedVideo.summary}</ReactMarkdown>
            </div>
            <button
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
              onClick={handleCloseDialog}
            >
              닫기
            </button>
          </>
        )}
      </dialog>
    </div>
  );
};

export default SummaryList;
