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
      const id = action.payload.id
      // console.log('id: ', id)
      const changedAnecdotes = state.map(anec =>
        anec.id !== id ? anec : action.payload
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

export const voteAnecdote = (updatedAnecdote) => {
  // console.log('updatedAnecdote: ', updatedAnecdote)
  return async dispatch => {
    const updatedAnec = await anecdoteService.update(updatedAnecdote)
    dispatch(vote(updatedAnec))
  }
}

export default anecdoteSlice.reducer
