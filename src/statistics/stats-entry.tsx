import React from 'react'

export const StatsEntry = (entry: StatisticsEntry) => {
  const date = new Date(entry.date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
  })

  return (
    <>
      <span className="stats-date">{date}</span>
      <div className="stats-data">
        <div>
          <span>Active</span> <span>{entry.active}</span>
        </div>
        <div>
          <span>Deaths</span> <span>{entry.deaths}</span>
        </div>
        <div>
          <span>Confirmed</span> <span>{entry.confirmed}</span>
        </div>
        <div>
          <span>Recovered</span> <span>{entry.recovered}</span>
        </div>
      </div>
    </>
  )
}
