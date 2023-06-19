import { configureStore } from '@reduxjs/toolkit'
import filterReducer from './filterReducer'
import notificationReducer from './notificationReducer'
import anecdoteReducer from './anecdoteReducer'

const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    filter: filterReducer, 
    notification: notificationReducer
  }
})

export default store