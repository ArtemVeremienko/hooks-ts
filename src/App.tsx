import { CSSProperties, useRef, useState } from 'react';
import './App.css';
import useIntersectionObserver from './hooks/useIntersectionObserver';
import useLockedBody from './hooks/useLockedBody';

const fixedCenterStyle: CSSProperties = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  // transform: 'translate(-50%, -50%)',
};

const fakeScrollableStyle: CSSProperties = {
  minHeight: '150vh',
  background: 'linear-gradient(palegreen, palegoldenrod, palevioletred)',
};

// Example 1: useLockedBody as useState()
function App1() {
  const [locked, setLocked] = useLockedBody();

  const toggleLocked = () => {
    setLocked(!locked);
  };

  return (
    <div style={fakeScrollableStyle}>
      <button style={fixedCenterStyle} onClick={toggleLocked}>
        {locked ? 'lock scroll' : 'lock scroll'}
      </button>
    </div>
  );
}

// Example 2: useLockedBody with our custom state
function App2() {
  const [locked, setLocked] = useState(false);

  const toggleLocked = () => {
    setLocked(!locked);
  };

  useLockedBody(locked);

  return (
    <div style={fakeScrollableStyle}>
      <button style={fixedCenterStyle} onClick={toggleLocked}>
        {locked ? 'unlock scroll' : 'lock scroll'}
      </button>
    </div>
  );
}

export default App2;
