const filterReducer = (state = 'ALL', action) => {

  console.log("filterReducer action: ", action) 

  switch (action.type) {
    case 'SET_FILTER': {

      return action.payload
    }

    default:
      return state
  }
}

export const filterChange = filterPayload => {
  return {
    type: 'SET_FILTER',
    payload: filterPayload,
  }
}

export default filterReducer