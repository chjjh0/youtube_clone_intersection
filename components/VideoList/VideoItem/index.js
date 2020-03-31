import React from 'react';
import styled from 'styled-components';

const VideoItemLayout = styled.div`
  width: 100%;
  height: 138px;
  margin-bottom: 2rem;
  color: white;
  cursor: pointer;

  @media screen and (max-width: 767px) {
    width: 100%;
    height: auto;
    float: none;
  }

  @media (min-width: 768px) and (max-width: 1023px) {
    display: inline-block;
    vertical-align: top;
    width: 45%;
    height: auto;
    margin-right: 5%;
  }
`;

const VideoThumbnail = styled.img`
  display: block;
  float: left;
  width: 246px;
  height: 138px;

  @media screen and (max-width: 767px) {
    width: 100%;
    height: auto;
    float: none;
  }

  @media (min-width: 768px) and (max-width: 1023px) {
    width: 100%;
    float: none;
    height: auto;
  }
`;

const VideoInfoLayout = styled.div`
  padding: 1rem 1rem 1rem 262px;

  &::after {
    display: block;
    content: '';
    clear: both;
  }

  @media screen and (max-width: 767px) {
    padding: 0;
    margin: 0.5rem 0;
  }

  @media (min-width: 768px) and (max-width: 1023px) {
    padding: 0;
    margin: 0.5rem 0;
  }
`;

const VideoTitle = styled.h3`
  font-size: 1rem;
  font-weight: 500;
  margin: 0 0 10px;
`;

const ChannelTitle = styled.h4`
  font-size: 1rem;
  font-weight: 400;
  color: #aaaaaa;
  padding: 4px 0;
  float: left;
  margin: 0;

  &:hover {
    color: #fff;
  }
`;

const VideoItem = ({ video, setRef, handleVideoSelect }) => {
  const replaceString = () => {
    const title = video.snippet.title;
    if (title.length >= 40) {
      return title.substr(0, 40) + ' ...';
    } else {
      return title;
    }
  };

  return (
    <VideoItemLayout
      className={setRef && 'lastEle'}
      onClick={() => handleVideoSelect(video)}
      ref={setRef}
    >
      <VideoThumbnail
        src={video.snippet.thumbnails.medium.url}
        alt={video.snippet.description}
      />

      <VideoInfoLayout className="videoinfoLayout">
        <VideoTitle>{replaceString()}</VideoTitle>
        <ChannelTitle>{video.snippet.channelTitle}</ChannelTitle>
      </VideoInfoLayout>
    </VideoItemLayout>
  );
};

export default VideoItem;
