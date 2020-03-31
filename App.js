import React, { useState } from 'react';
import styled from 'styled-components';
import './app.css';
// components
import VideoPlay from './components/VideoPlay';
import VideoList from './components/VideoList';

// styled
const UiContainer = styled.div`
  height: 100vh;
  background: #1f1f1f;
  overflow-x: hidden;
`;

const App = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleVideoSelect = video => {
    setSelectedVideo(video);
  };

  return (
    <UiContainer>
      {selectedVideo && <VideoPlay video={selectedVideo} />}
      <VideoList handleVideoSelect={handleVideoSelect} />
    </UiContainer>
  );
};

export default App;
