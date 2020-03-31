import { useState, useEffect, useCallback } from 'react';

const baseOption = {
  root: null,
  threshold: 0.5,
  rootMargin: '0px',
};

const useIntersect = (onIntersect, option) => {
  // console.log('4 useIntersect start', onIntersect, option);

  const [ref, setRef] = useState(null);
  const checkIntersect = useCallback(([entry], observer) => {
    console.log('5 checkIntersect ', entry, observer);
    if (entry.isIntersecting) {
      onIntersect(entry, observer);
    }
  }, []);

  useEffect(() => {
    let observer;
    console.log('2 mount', observer);

    if (ref) {
      console.log('3 ref 있음');
      observer = new IntersectionObserver(checkIntersect, {
        ...baseOption,
        ...option,
      });
      observer.observe(ref);
    }
    return () => {
      console.log('useIntersect unmount');
      observer && observer.disconnect();
    };
  }, [ref, option.root, option.threshold, option.rootMargin, checkIntersect]);

  return [ref, setRef];
};

export default useIntersect;

// 원본
// const useIntersect = (onIntersect, option) => {
//   // console.log('4 useIntersect start', onIntersect, option);

//   const [ref, setRef] = useState(null);
//   const checkIntersect = useCallback(([entry], observer) => {
//     console.log('5 checkIntersect ', entry, observer);
//     if (entry.isIntersecting) {
//       onIntersect(entry, observer);
//     }
//   }, []);

//   useEffect(() => {

//     let observer;
//     console.log('2 mount', observer);

//     if (ref) {
//       console.log('3 ref 있음');
//       observer = new IntersectionObserver(checkIntersect, {
//         ...baseOption,
//         ...option
//       });
//       observer.observe(ref);
//     }
//     // unmount
//     return () => {
//       console.log('useIntersect unmount');
//       observer && observer.disconnect();
//     }
//   }, [ref, option.root, option.threshold, option.rootMargin, checkIntersect]);

//   return [ref, setRef];
// };

// export default useIntersect;
