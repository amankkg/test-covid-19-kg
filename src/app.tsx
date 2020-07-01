import React from 'react'

import {useAppSelector, useAppDispatch} from './store'
import {actions} from './slice'

export const App = () => {
  const counter = useAppSelector((store) => store.value)
  const dispatch = useAppDispatch()

  const increment = () => dispatch(actions.increment())
  const decrement = () => dispatch(actions.decrement())

  return (
    <div>
      <p>Counter: {counter}</p>
      <button onClick={decrement}>Decrement</button>
      &nbsp;
      <button onClick={increment}>Increment</button>
    </div>
  )
}
