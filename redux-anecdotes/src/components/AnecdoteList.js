import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

const AnecdoteList = (props) => {
  const dispatch = useDispatch()

  const voteFor = (id) => {
    console.log('vote', id)
    dispatch(vote(id))
  }

  const anecdotes = useSelector(state => {
    if ( state.filter === 'ALL' ) {
      console.log('state.anecdotes: ', state.anecdotes)
      return state.anecdotes
    } else {
      const filteredAnecdotes = state.anecdotes.filter ( 
        anec =>  anec.content.toLowerCase().includes(state.filter.toLowerCase())) 
      return filteredAnecdotes
    }
  })

  return (
    <div>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button
              key = {anecdote.id}
              onClick={() => voteFor(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )}

export default AnecdoteList