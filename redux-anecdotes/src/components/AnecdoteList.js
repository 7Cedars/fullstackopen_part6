import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const dispatch = useDispatch()

  const voteFor = (id, content) => {
    console.log('vote', id)
    console.log('content', content)
    dispatch(vote(id))
    dispatch(setNotification({message: `you voted for: ${content}`, messageId: id}),
    setTimeout(() => { dispatch(removeNotification(id))}, 5000) 
    )
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
              onClick={() => voteFor(anecdote.id, anecdote.content)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )}

export default AnecdoteList