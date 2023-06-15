import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

const AnecdoteList = (props) => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state)
  
  const voteFor = (id) => {
    console.log('vote', id)
    dispatch(vote(id))
  }

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