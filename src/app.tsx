import React, {useEffect, useMemo} from 'react'

import './app.css'
import * as core from './core'
import {useAppSelector, useAppDispatch} from './store'
import * as thunks from './thunks'

export const App = () => {
  const dispatch = useAppDispatch()

  const selectedCountry = useAppSelector((store) => store.country)
  const countries = useAppSelector((store) => store.countries)
  const statistics = useAppSelector((store) => store.statistics)
  const loading = useAppSelector((store) => store.pendingCount > 0)

  const recentStatistics = useMemo(() => core.getRecentStatistics(statistics), [
    statistics,
  ])

  const [peakDate, peakRecover] = useMemo(
    () => (statistics.length > 0 ? core.findPeakRecover(statistics) : []),
    [statistics],
  )

  useEffect(() => {
    dispatch(thunks.fetchCountries())
    dispatch(thunks.restoreSelectedCountry())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!selectedCountry) return

    dispatch(thunks.fetchStatistics(selectedCountry))
  }, [selectedCountry, dispatch])

  if (loading) return <div className="root">loading...</div>

  return (
    <div className="root">
      <select
        value={selectedCountry}
        onBlur={(event) => {
          dispatch(thunks.selectCountry(event.currentTarget.value))
        }}
        onChange={(event) => {
          dispatch(thunks.selectCountry(event.currentTarget.value))
        }}
        className="country"
      >
        {countries.map(({slug, country}) => (
          <option key={slug} value={slug}>
            {country}
          </option>
        ))}
      </select>

      {peakRecover !== undefined && peakDate !== undefined && (
        <p className="peak">
          Top recovered cases: {peakRecover} at {peakDate.toLocaleDateString()}
        </p>
      )}

      {statistics.length === 0 && <h2>no data</h2>}

      <ul className="statistics">
        {recentStatistics.map((entry) => (
          <li key={selectedCountry + ':' + entry.date}>
            <p>{new Date(entry.date).toLocaleDateString()}</p>
            <p>Active {entry.active}</p>
            <p>confirmed {entry.confirmed}</p>
            <p>Deaths {entry.deaths}</p>
            <p>Recovered {entry.recovered}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
