import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => {
    
      if (state.notification) { 
        const notifications = state.notification
        const selectedNotification = notifications.slice(-1)
       // console.log("notification to RETURN: ", selectedNotification)
        return selectedNotification[0].message
      }

    })

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

export default Notification