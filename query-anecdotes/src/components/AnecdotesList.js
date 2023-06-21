import { getAnecdotes, updateAnecdote } from '../requests'
import { useMutation, useQueryClient, useQuery } from 'react-query'
import { useContext } from 'react'
import NotificationContext from '../NotificationContext'

const AnecdoteList = () => {

  const queryClient = useQueryClient()
  const [notification, notificationDispatch] = useContext(NotificationContext)

    const updateAnecdoteMutation = useMutation(updateAnecdote, {
      onSuccess: (anecdote) => {
        queryClient.invalidateQueries('anecdotes')
        notificationDispatch({type: 'VOTE', payload: anecdote.content})
        setTimeout(() => {
          notificationDispatch({type: 'REMOVE'})
        }, 5000);
      },
    })
  
    const handleVote = (anecdote) => {
      updateAnecdoteMutation.mutate({...anecdote, votes: (anecdote.votes + 1) })
      console.log('vote')
    }

    const result = useQuery('anecdotes', getAnecdotes )
    console.log(result)
  
    if ( result.isLoading ) {
      return <div>loading data...</div>
    }
  
    if ( result.isError ) {
      return <div>Anecdote service is not available due to server problem. That's all I know! </div>
    }
  
    const anecdotes = result.data

    return ( 
      anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )
    )
}

export default AnecdoteList