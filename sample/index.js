import React, { useState, useEffect } from 'react';

import useIntersect from './useIntersect';
import './styles.css';

const fakeFetch = (delay = 1000) => new Promise(res => setTimeout(res, delay));

const ListItem = ({ number, lastEle, setRef }) => (
  <div
    className={lastEle ? 'lastEle ListItem' : 'ListItem'}
    ref={lastEle ? setRef : null}
  >
    <span>{number}</span>
  </div>
);

export default function App() {
  const [state, setState] = useState({ itemCount: 0, isLoading: false });
  const { itemCount, isLoading } = state;

  /* fake async fetch */
  const fetchItems = async () => {
    setState(prev => ({ ...prev, isLoading: true }));

    // delay 용도
    await fakeFetch();

    // 10개 추가
    setState(prev => ({
      itemCount: prev.itemCount + 10,
      isLoading: false,
    }));
  };

  /* initial fetch */
  useEffect(() => {
    fetchItems();
  }, []);

  const onIntersect = async (entry, observer) => {
    observer.unobserve(entry.target);
    await fetchItems();
    observer.observe(entry.target);
  };

  // 리렌더링 될 때 useIntersect가 사라져서 unmount 됐다가 다시 생성되 mount 되는 듯
  // 그래서 unmount때 disconnect가 실행되므로 자동으로 감시요소가 갱신됨
  const [_, setRef] = useIntersect(onIntersect, {});

  if (!itemCount) return null;
  return (
    <div className="App">
      {[...Array(itemCount)].map((_, i) =>
        [...Array(itemCount)].length === i + 1 ? (
          <ListItem lastEle={true} key={i} number={i} setRef={setRef} />
        ) : (
          <ListItem key={i} number={i} />
        ),
      )}
    </div>
  );
}
