import {configureStore} from '@reduxjs/toolkit'
import {useDispatch, useSelector, TypedUseSelectorHook} from 'react-redux'

import {reducer} from './slice'

const store = configureStore({reducer})

type RootState = ReturnType<typeof reducer>
type AppDispatch = typeof store.dispatch

export {store}
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = () => useDispatch<AppDispatch>()

// https://www.snowpack.dev/#hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept(['./slice'], (data: any) => {
    const {reducer} = data.deps[0]

    store.replaceReducer(reducer)
  })
}
