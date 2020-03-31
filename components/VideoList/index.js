import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
// lib
import useIntersect from '../../lib/useIntersect';
import useIntersectFixed from '../../lib/useIntersectFixed';
import CircularProgress from '@material-ui/core/CircularProgress';
// redux
import { useSelector, useDispatch } from 'react-redux';
import { getVideos, getVideosByToken } from '../../modules/videos';
// components
import VideoItem from './VideoItem';

const VideoListLayout = styled.div`
  width: 68vw;
  margin: 8vh auto 0;
  padding: 0.3rem;

  a {
    text-decoration: none;
  }
`;

const ProgressLayout = styled.div`
  text-align: center;
  color: #aaa;
`;

const VideoList = ({ handleVideoSelect }) => {
  // redux
  const { data: videos, loading, error } = useSelector(
    ({ videos }) => videos.videos,
  );
  const dispatch = useDispatch();

  const handleFetch = () => {
    dispatch(getVideos());
  };

  const handlePagination = () => {
    dispatch(getVideosByToken());
  };

  const onIntersect = async (entry, observer) => {
    observer.unobserve(entry.target);
    await handlePagination();
    observer.observe(entry.target);
  };

  const [_, setRef] = useIntersect(onIntersect);
  const [__, setRefFixed] = useIntersectFixed({
    root: null,
    threshold: 0,
    rootMargin: '0px',
  });

  useEffect(() => {
    handleFetch();
  }, []);

  if (!videos) return null;
  if (error) return <div>에러가 발생했습니다.</div>;

  return (
    <VideoListLayout>
      {videos &&
        videos.map((video, idx) =>
          videos.length === idx + 1 ? (
            <a href="#videoBox">
              <VideoItem
                setRef={setRef}
                key={video.id}
                video={video}
                handleVideoSelect={handleVideoSelect}
              />
            </a>
          ) : (
            <a href="#videoBox">
              <VideoItem
                setRef={idx === 0 ? setRefFixed : null}
                key={video.id}
                video={video}
                handleVideoSelect={handleVideoSelect}
              />
            </a>
          ),
        )}

      {loading && (
        <ProgressLayout>
          <CircularProgress color="inherit" />
        </ProgressLayout>
      )}
    </VideoListLayout>
  );
};

export default VideoList;
