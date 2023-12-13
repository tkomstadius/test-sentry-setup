import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import * as Sentry from '@sentry/react'

const releaseVar = 'my-release-1'

Sentry.init({
  dsn: 'https://ed67759ef24d4f09fcc91d6ccb8d26ba@o4506388683685888.ingest.sentry.io/4506388688601088',
  integrations: [new Sentry.BrowserTracing()],
  release: releaseVar,
  tracesSampleRate: 1.0,
})

class ValidationError extends Error {
  constructor(message) {
    super(message)
    this.name = `ERROR: "${message}" from ${releaseVar}`
  }
}

function App() {
  const [count, setCount] = useState(0)

  function handleThrowError(message) {
    throw new ValidationError(message)
  }

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button
          onClick={() => {
            setCount((count) => count + 1)
            handleThrowError('This is an error')
          }}
        >
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  )
}

export default App
