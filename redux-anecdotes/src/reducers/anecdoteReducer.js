import { createSlice } from '@reduxjs/toolkit'

const anecdotesAtStart = {
  anecdotes: 
  [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ], 
  filter: 'ALL', 
  notifications: []
}

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.anecdotes.map(asObject)

const compareVotes = (a, b) => {
  return b.votes - a.votes
 }

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState, 
  reducers: {
    newAnecdote(state, action) {
      const content = action.payload
      state.push({
        content, 
        id: getId(),
        votes: 0,
      })
    }, 
    vote(state, action) {
      const id = action.payload
      const anecToChange = state.find(anec => anec.id === id)
      const changedAnec = {
        ...anecToChange, votes: anecToChange.votes + 1
      }
      const changedAnecdotes = state.map(anec =>
        anec.id !== id ? anec : changedAnec 
      )

      // const anecdote = state.find(anec => anec.id === action.payload.id)
      // const notification = `you voted for ${anecdote}` 

      return changedAnecdotes.sort(compareVotes)
    }
  }
})

export const { newAnecdote, vote } = anecdoteSlice.actions
export default anecdoteSlice.reducer

// (state = initialState, action) => {
//   console.log('state now: ', state)
//   console.log('action', action)

//   switch (action.type) {
//     case 'VOTE': {
//       const id = action.payload.id
//       const anecToChange = state.find(anec => anec.id === id)
//       const changedAnec = {
//         ...anecToChange, votes: anecToChange.votes + 1
//       }
//       const changedAnecdotes = state.map(anec =>
//         anec.id !== id ? anec : changedAnec 
//       )

//       return changedAnecdotes.sort(compareVotes)
//     }

//     case 'NEW_ANECDOTE': {
//       console.log("action.data:", action.data)
//       return [...state, action.payload]
//     }
    
//   default: return state
//   }
// }

// export const createAnecdote = (content) => {
//   return {
//     type: 'NEW_ANECDOTE',
//     payload: {
//       content,
//       id: getId(),
//       votes: 0,
//     }
//   }
// }

// export const vote = (id) => {
//   return {
//     type: 'VOTE',
//     payload: { id }
//   }
// }

// export default anecdoteReducer