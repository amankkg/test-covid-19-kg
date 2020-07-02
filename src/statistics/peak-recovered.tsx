import React, {useMemo} from 'react'

import {useAppSelector} from 'src/store'

import {findPeakRecover} from './core'

export const PeakRecovered = () => {
  const state = useAppSelector((state) => state.statistics)

  const [peakDate, peakRecover] = useMemo(
    () => (state.data.length > 0 ? findPeakRecover(state.data) : []),
    [state.data],
  )

  if (state.pending) return <p>loading...</p>

  if (peakRecover === undefined || peakDate === undefined)
    return <p>no recovery data</p>

  const date = peakDate.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
  })

  return (
    <div className="peak">
      <span className="label">Top recovered cases</span>
      <span className="number">{peakRecover}</span>
      <span className="date">{date}</span>
    </div>
  )
}
