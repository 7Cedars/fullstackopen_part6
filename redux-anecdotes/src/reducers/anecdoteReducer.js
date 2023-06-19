import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdotesAtStart = {
  anecdotes: [], 
  filter: 'ALL', 
  notifications: []
}

const compareVotes = (a, b) => {
  return b.votes - a.votes
 }

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: anecdotesAtStart.anecdotes, 
  reducers: {
    vote(state, action) {
      const id = action.payload
      const anecToChange = state.find(anec => anec.id === id)
      const changedAnec = {
        ...anecToChange, votes: anecToChange.votes + 1
      }
      const changedAnecdotes = state.map(anec =>
        anec.id !== id ? anec : changedAnec 
      )
      return changedAnecdotes.sort(compareVotes)
    }, 
    appendAnecdote(state, action) {
      state.push(action.payload)
    }, 
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { vote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes= () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export default anecdoteSlice.reducer
