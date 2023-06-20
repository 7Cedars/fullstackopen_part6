import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const dispatch = useDispatch()

  const voteFor = (anecdote) => {
    const updatedAnec = {...anecdote, votes: anecdote.votes + 1} 
    dispatch(voteAnecdote(updatedAnec))
    dispatch(setNotification(`you voted for: ${anecdote.content}`, 5000),
    )
  } 

  const anecdotes = useSelector(state => {
    if ( state.filter === 'ALL' ) {
      // console.log('state.anecdotes: ', state.anecdotes)
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
              onClick={() => voteFor(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )}

export default AnecdoteList