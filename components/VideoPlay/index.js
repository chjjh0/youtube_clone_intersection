import React, { useEffect, useState } from 'react';
// lib
import styled from 'styled-components';
// fetch
import youtube from '../../api/youtube';
import { channelsOption } from '../../api/youtubeAPIOption';
import { useSelector } from 'react-redux';

const VideoBox = styled.div`
  background: #313131;
  position: ${({ fixed }) => (fixed ? 'relative' : 'sticky')};
  top: 0;
  left: 0;
`;

const YoutubeIframe = styled.iframe`
  width: 100%;
  --widthA: 100vh;
  height: calc(var(--widthA) / 1.8);
  overflow: hidden;
  border: none;

  @media screen and (max-width: 767px) {
    width: 100%;
    height: auto;
  }
`;

const SelectedVideoInfo = styled.div`
  width: 100%;
  /* min-height: 150px; */
  padding: 1rem;
  box-sizing: border-box;
  color: #aaa;
`;

const ChannelLayout = styled.div``;

const ChannelThumbnail = styled.img`
  display: inline-block;
  margin-right: 1rem;
  background: #aaa;
  width: 45px;
  height: 45px;
  border: 0;
  border-radius: 50px;
`;

const ChannelTitle = styled.h2`
  display: inline-block;
  margin: 0;
  vertical-align: top;
  line-height: 1.8;
`;

const SelectedVideoTitle = styled.h3`
  margin: 1rem 0;
`;

const VideoPlay = ({ video }) => {
  const [channelImg, setChannelImg] = useState(null);
  const videoSrc = `https://www.youtube.com/embed/${video.id}`;
  const fixed = useSelector(({ fixed }) => fixed.fixed);

  const fetchChannelInfo = () => {
    youtube
      .get('/channels', channelsOption(video.snippet.channelId))
      .then(res => {
        setChannelImg(res.data.items[0].snippet.thumbnails.default.url);
      });
  };

  useEffect(() => {
    setChannelImg(null);
    fetchChannelInfo();
  }, [video]);

  if (!video) return null;

  return (
    <VideoBox fixed={fixed} id={fixed ? 'videoBox' : null}>
      <YoutubeIframe src={videoSrc} title="Video player" />
      <SelectedVideoInfo>
        <ChannelLayout>
          <ChannelThumbnail src={channelImg} alt={video.snippet.channelTitle} />
          <ChannelTitle>{video.snippet.channelTitle}</ChannelTitle>
        </ChannelLayout>
        <SelectedVideoTitle>{video.snippet.title}</SelectedVideoTitle>
      </SelectedVideoInfo>
    </VideoBox>
  );
};

export default VideoPlay;
