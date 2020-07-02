import React from 'react'

import {useAppSelector, useAppDispatch} from '../store'

import {selectCountry} from './slice'

export const CountrySelect = () => {
  const state = useAppSelector((state) => state.countries)

  const dispatch = useAppDispatch()

  if (state.pending) return <p>loading...</p>

  return (
    <select
      value={state.selected}
      onBlur={(event) => {
        dispatch(selectCountry(event.currentTarget.value))
      }}
      onChange={(event) => {
        dispatch(selectCountry(event.currentTarget.value))
      }}
      className="country-select"
    >
      {state.list.map(({slug, country}) => (
        <option key={slug} value={slug}>
          {country}
        </option>
      ))}
    </select>
  )
}
