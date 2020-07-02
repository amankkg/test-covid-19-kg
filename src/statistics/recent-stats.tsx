import React, {useMemo} from 'react'

import {useAppSelector} from '../store'

import {getRecentStatistics} from './core'
import {StatsEntry} from './stats-entry'

export const RecentStats = () => {
  const state = useAppSelector((state) => ({
    ...state.statistics,
    country: state.countries.selected,
  }))

  const recentStatistics = useMemo(() => getRecentStatistics(state.data), [
    state.data,
  ])

  if (state.pending) return <p>loading...</p>

  return (
    <ul className="stats">
      {state.data.length === 0 && <h2>no data</h2>}
      {recentStatistics.map((entry) => (
        <li key={state.country + ':' + entry.date}>
          <StatsEntry {...entry} />
        </li>
      ))}
    </ul>
  )
}
