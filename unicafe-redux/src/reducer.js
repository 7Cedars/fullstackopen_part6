
const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'INCREMENT': {
      const stateToChange = {} 
      // I am sure there are pretier ways to implement this - but it works 
      const payloadWhitelist = ['good', 'ok', 'bad']
      if (payloadWhitelist.find(item => item === action.payload)) { 
        stateToChange[action.payload] = state[action.payload] + 1   
      }
      const changedState = {...state, ...stateToChange}
      return changedState  
    }
    case 'DECREMENT': {
      const stateToChange = {} 
      const payloadWhitelist = ['good', 'ok', 'bad']
      if (payloadWhitelist.find(item => item === action.payload)) { 
        stateToChange[action.payload] = state[action.payload] - 1   
      }
      const changedState = {...state, ...stateToChange}
      return changedState 
    }

    case 'RESET': {
      const changedState = initialState
      return changedState 
    }

    default: return state
  }
}

export default counterReducer
