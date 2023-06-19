import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification', 
  initialState: 'APP STARTED',
  reducers: {
    notificationChange(state, action) {
      const notification = action.payload
      return notification
    }
  }
})

export const { notificationChange } = notificationSlice.actions
export default notificationSlice.reducer
