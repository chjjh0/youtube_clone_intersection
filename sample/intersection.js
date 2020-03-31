import React, { useState, useEffect, useRef } from 'react';

// Usage
export default function App() {
  console.log('app start');
  // Ref for the element that we want to detect whether on screen
  const ref = useRef();
  // Call the hook passing in ref and root margin
  // In this case it would only be considered onScreen if more ...
  // ... than 300px of element is visible.
  const onScreen = useOnScreen(ref, '-300px');

  useEffect(() => {
    console.log('app mounted');
  }, []);

  return (
    <div>
      <div style={{ height: '100vh', background: 'purple' }}>
        <h1>Scroll down to next section 👇</h1>
      </div>

      <div
        className="detect"
        ref={ref}
        style={{
          height: '100vh',
          backgroundColor: onScreen ? 'red' : 'orange'
        }}
      >
        {onScreen ? (
          <div>
            <h1>Hey I'm on the screen</h1>
            <img src="https://i.giphy.com/media/ASd0Ukj0y3qMM/giphy.gif" />
          </div>
        ) : (
          <h1>Scroll down 300px from the top of this section 👇</h1>
        )}
      </div>
    </div>
  );
}

// Hook
function useOnScreen(ref, rootMargin = '0px') {
  // State and setter for storing whether element is visible
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update our state when observer callback fires
        console.log('2 entry', entry);
        setIntersecting(entry.isIntersecting);
      },
      {
        rootMargin
      }
    );
    observer.unobserve(ref.current);

    // didmount 다음에 ref.current 인식가능
    if (ref.current) {
      console.log('1 구독', ref.current, observer);
      observer.observe(ref.current);
    }
    return () => {
      console.log('unmount 구독취소', observer);
      observer.unobserve(ref.current);
    };
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return isIntersecting;
}