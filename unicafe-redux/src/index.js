import React, { useEffect } from 'react'
import ReactDOM from 'react-dom/client'

import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const goodIncr = () => {
    store.dispatch({
      type: 'INCREMENT', 
      payload: 'good'
    })
  }

  const okIncr = () => {
    store.dispatch({
      type: 'INCREMENT', 
      payload: 'ok'
    })
  }

  const badIncr = () => {
    store.dispatch({
      type: 'INCREMENT', 
      payload: 'bad'
    })
  }

  const reset = () => {
    store.dispatch({
      type: 'RESET'
    })
  }

  useEffect(() => {
    console.log(store.getState())
  }, []);

  return (
    <div>
      <button onClick={goodIncr}>good</button> 
      <button onClick={okIncr}>ok</button> 
      <button onClick={badIncr}>bad</button>
      <button onClick={reset}> reset stats</button>
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)