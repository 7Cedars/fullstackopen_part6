import { configureStore } from '@reduxjs/toolkit'
import filterReducer from './filterReducer'
import notificationReducer from './notificationReducer'
import anecdoteService from '../services/anecdotes'
import anecdoteReducer, { appendAnecdote } from './anecdoteReducer'

const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    filter: filterReducer, 
    notification: notificationReducer
  }
})

anecdoteService.getAll().then(anecdotes =>
  anecdotes.forEach(anecdote => {
    store.dispatch(appendAnecdote(anecdote))
  })
)


export default store