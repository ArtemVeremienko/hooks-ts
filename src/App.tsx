import { useState } from 'react'
import './App.css'
import useElementSize from './hooks/useElementSize'

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

function App() {
  const [isVisible, setVisible] = useState(true)
  const [squareRef, { width, height }] = useElementSize()

  const toggleVisibility = () => setVisible(x => !x)

  return (
    <>
      <p>{`The square width is ${width}px and height ${height}px`}</p>
      <p>Try, resize your window and-or click on the button.</p>

      <button onClick={toggleVisibility}>
        {isVisible ? 'Hide' : 'Show'} square
      </button>

      {isVisible && (
        <div
          ref={squareRef}
          style={{
            width: '50%',
            paddingTop: '50%',
            backgroundColor: 'aquamarine',
            margin: 'auto',
          }}
        />
      )}
    </>
  )
}

export default App
