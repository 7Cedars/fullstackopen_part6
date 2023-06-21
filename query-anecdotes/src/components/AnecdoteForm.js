import { createAnecdote } from '../requests'
import { useMutation, useQueryClient } from 'react-query'
import { useContext } from 'react'
import NotificationContext from '../NotificationContext'

const AnecdoteForm = () => {
  
  const queryClient = useQueryClient()
  const [notification, notificationDispatch] = useContext(NotificationContext)
  
  const newAnecMutation = useMutation(createAnecdote, {
    onSuccess: ({content, votes}) => {
      queryClient.invalidateQueries('anecdotes')
      notificationDispatch({type: 'CREATE', payload: content})
      setTimeout(() => {
        notificationDispatch({type: 'REMOVE'})
      }, 5000);
    },
    onError: () => {
      notificationDispatch({type: 'ERROR'})
      setTimeout(() => {
        notificationDispatch({type: 'REMOVE'})
      }, 5000);
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecMutation.mutate({ content, votes: 0 })
    console.log('new anecdote')
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
