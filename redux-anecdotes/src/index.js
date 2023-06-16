import React from 'react'
import ReactDOM from 'react-dom/client'
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'

import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import App from './App'

// import { filterChange } from './reducers/filterReducer'
// import { createAnecdote } from './reducers/anecdoteReducer'

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  filter: filterReducer
})

const store = createStore(reducer)
console.log("store: ", store.getState())

store.subscribe(() => console.log("store now: ", store.getState()))
// store.subscribe(() => console.log("store.anecdotes now: ", store.getState().anecdotes ))
// store.dispatch(filterChange('hurts'))
// store.dispatch(createAnecdote('combineReducers forms one reducer from many simple reducers'))
// store.dispatch(createAnecdote('combineReducers forms one reducer from many simple reducers'))

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    {/* <div />  */}
    <App/>
  </Provider>
)