import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification', 
  initialState: 'APP started',
  reducers: {
    createNotification(state, action) {
      const newNotification = action.payload
      return newNotification
    },
    removeNotification(state, action) {
      return null
    }
  }
})

export const { createNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer

export const setNotification = (message, ms) => {
  // console.log('updatedAnecdote: ', updatedAnecdote)
  return async dispatch => {
    dispatch(createNotification(message))
    setTimeout(() => { dispatch(removeNotification(message))}, ms) 
  }
}

