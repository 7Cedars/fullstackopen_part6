import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }

  test('should return a proper initial state when called with undefined state', () => {
    // const state = {}
    const action = {
      type: 'DO_NOTHING'
    }

    const newState = counterReducer(initialState, action)
    expect(newState).toEqual(initialState)
  })

  test('good is incremented', () => {
    const action = {
      type: 'INCREMENT', 
      payload: 'good' 
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0
    })
  })

  test('good is decremented', () => {
    const action = {
      type: 'DECREMENT', 
      payload: 'good' 
    }
    const state = initialState

    deepFreeze(state)
    const newState = counterReducer(state, action)
    expect(newState).toEqual({
      good: -1,
      ok: 0,
      bad: 0
    })     
  })

  test('ok is incremented four times', () => {
    const action = {
      type: 'INCREMENT', 
      payload: 'ok' 
    }
    let state = initialState
    deepFreeze(state)
    for (let i = 0; i < 4; i++) {
      state = counterReducer(state, action)
    }

    expect(state).toEqual({
      good: 0,
      ok: 4,
      bad: 0
    })     
  })

  test('bad is incremented three times', () => {
    const action = {
      type: 'INCREMENT', 
      payload: 'bad' 
    }
    let state = initialState
    deepFreeze(state)

    for (let i = 0; i < 3; i++) {
      state = counterReducer(state, action)
    }

    expect(state).toEqual({
      good: 0,
      ok: 0,
      bad: 3
    })     
  })

  test('nothing happens when zero incremented', () => {
    const action = {
      type: 'INCREMENT', 
      payload: 'zero' 
    }
    const state = initialState
    deepFreeze(state)
    const newState = counterReducer(state, action)

    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 0
    })     
  })

  test('nothing happens when zero decremented', () => {
    const action = {
      type: 'DECREMENT', 
      payload: 'zero' 
    }
    const state = initialState
    deepFreeze(state)
    const newState = counterReducer(state, action)

    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 0
    })     
  })
})