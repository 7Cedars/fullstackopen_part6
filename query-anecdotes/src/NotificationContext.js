import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "CREATE":
      return `Blog title '${action.payload}' succesfully created.`
    case "VOTE":
      return `You voted for '${action.payload}'.`
    case "REMOVE":
      return null
    case "ERROR":
        return `Anecdote is too short, must have length of five characters or more.`
    default:
        return state
  }
}

const NotificationContext = createContext()

export const useNotificationValue = ({type, content, ms}) => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[0]
}

export const useNotificationDispatch = ({type, content, ms}) => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[1]
}

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, null)

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch] }>
      {props.children}
    </NotificationContext.Provider>
  )
}



export default NotificationContext
