import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification', 
  initialState: [{message: '', messageId: '0'}],
  reducers: {
    setNotification(state, action) {      
      const notifications = state
      const notification = action.payload.message 
      const messageId = action.payload.messageId 
      notifications.push({message: notification, messageId: messageId}) 
      console.log('New notifications list: ', JSON.parse(JSON.stringify(notifications)))
      return notifications
    },
    removeNotification(state, action) {
      const notifications = state  
      console.log('action.payload ', JSON.parse(JSON.stringify(action.payload)))
      const newNotification = notifications.filter(note => note.messageId !== action.payload.toString())
      console.log('Filtered notifications list: ', JSON.parse(JSON.stringify(newNotification)))
      return newNotification
    }
  }
})

export const { setNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer
