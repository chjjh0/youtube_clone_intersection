import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';

const defaultOption = {
  root: null,
  threshold: 0.5,
  rootMargin: '0px',
};

const useIntersect = (onIntersect, option = defaultOption) => {
  const { loading, nextPageToken } = useSelector(state => state.videos.videos);
  const [ref, setRef] = useState(null);

  const checkIntersect = useCallback(
    ([entry], observer) => {
      if (entry.isIntersecting && loading === false) {
        if (nextPageToken === null) {
          observer && observer.disconnect();
        } else {
          onIntersect(entry, observer);
        }
      }
    },
    [loading],
  );

  useEffect(() => {
    let observer;
    if (ref) {
      observer = new IntersectionObserver(checkIntersect, {
        ...option,
      });
      observer.observe(ref);
    }
    // unmount
    return () => {
      observer && observer.disconnect();
    };
  }, [ref, option.root, option.threshold, option.rootMargin, checkIntersect]);

  return [ref, setRef];
};

export default useIntersect;
