import React, {useMemo} from 'react'

import {useAppSelector} from 'src/store'

import {getRecentStatistics} from './core'

export const RecentStatistics = () => {
  const state = useAppSelector((state) => ({
    ...state.statistics,
    country: state.countries.selected,
  }))

  const recentStatistics = useMemo(() => getRecentStatistics(state.data), [
    state.data,
  ])

  if (state.pending) return <p>loading...</p>

  return (
    <ul className="statistics">
      {state.data.length === 0 && <h2>no data</h2>}
      {recentStatistics.map((entry) => (
        <li key={state.country + ':' + entry.date}>
          <p>{new Date(entry.date).toLocaleDateString()}</p>
          <p>Active {entry.active}</p>
          <p>Confirmed {entry.confirmed}</p>
          <p>Deaths {entry.deaths}</p>
          <p>Recovered {entry.recovered}</p>
        </li>
      ))}
    </ul>
  )
}
