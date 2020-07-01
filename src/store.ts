import {combineReducers, configureStore} from '@reduxjs/toolkit'
import {useDispatch, useSelector, TypedUseSelectorHook} from 'react-redux'

import {reducer as countries} from './countries'
import {reducer as statistics} from './statistics'

const reducer = combineReducers({countries, statistics})

export const store = configureStore({reducer})

type RootState = ReturnType<typeof reducer>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()

// https://www.snowpack.dev/#hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept(['./countries', './statistics'], (data: any) => {
    const _countries: typeof countries = data.deps[0].reducer
    const _statistics: typeof statistics = data.deps[1].reducer

    const reducer = combineReducers({
      countries: _countries,
      statistics: _statistics,
    })

    store.replaceReducer(reducer)
  })
}
