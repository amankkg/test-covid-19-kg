import React, {useEffect} from 'react'

import {useAppSelector, useAppDispatch} from './store'
import {thunks} from './slice'

export const App = () => {
  const selectedCountry = useAppSelector((store) => store.country)
  const countries = useAppSelector((store) => store.countries)
  const loading = useAppSelector((store) => store.pendingCount > 0)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(thunks.fetchCountries())
    dispatch(thunks.restoreSelectedCountry())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading) return <h1>loading...</h1>

  return (
    <div>
      <select
        value={selectedCountry}
        onBlur={(event) => {
          dispatch(thunks.selectCountry(event.currentTarget.value))
        }}
        onChange={(event) => {
          dispatch(thunks.selectCountry(event.currentTarget.value))
        }}
      >
        {countries.map(({slug, country}) => (
          <option key={slug} value={slug}>
            {country}
          </option>
        ))}
      </select>
    </div>
  )
}
