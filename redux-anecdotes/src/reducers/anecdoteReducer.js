import { createSlice } from '@reduxjs/toolkit'

const anecdotesAtStart = {
  anecdotes: [], 
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
    }, 
    appendAnecdote(state, action) {
      state.push(action.payload)
    }
  }
})

export const { newAnecdote, vote, appendAnecdote } = anecdoteSlice.actions
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