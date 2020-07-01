import React, {useEffect} from 'react'

import {useAppSelector, useAppDispatch} from './store'
import {CountrySelect, fetchCountries, selectCountry} from './countries'
import {Peak, RecentStatistics, fetchStatistics} from './statistics'

export const App = () => {
  const dispatch = useAppDispatch()
  const country = useAppSelector((store) => store.countries.selected)

  useEffect(() => {
    if (country) {
      dispatch(fetchStatistics(country))
    } else {
      dispatch(fetchCountries())
      dispatch(selectCountry())
    }
  }, [country, dispatch])

  return (
    <div className="app">
      <CountrySelect />
      <Peak />
      <RecentStatistics />
    </div>
  )
}
