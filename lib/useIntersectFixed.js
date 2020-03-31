import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toggleFixed } from '../modules/fixed';

const defaultOption = {
  root: null,
  threshold: 0.5,
  rootMargin: '0px',
};

const useIntersect = (option = defaultOption) => {
  const [ref, setRefFixed] = useState(null);
  const dispatch = useDispatch();

  const checkIntersect = ([entry], observer) => {
    dispatch(toggleFixed());
    // 현재는 toggle을 위한 로직이 같기때문에 아래처럼 분기하지 않고 하나로 작동
    // if (entry.isIntersecting) {
    //   dispatch(toggleFixed());
    // } else {
    //   dispatch(toggleFixed());
    // }
  };

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
  }, [ref]);

  return [ref, setRefFixed];
};

export default useIntersect;
