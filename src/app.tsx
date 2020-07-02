import React, {useEffect, useState} from 'react'

import {useAppSelector, useAppDispatch} from './store'
import {CountrySelect, fetchCountries, selectCountry} from './countries'
import {PeakRecovered, RecentStats, fetchStatistics} from './statistics'
import {Thumbnail} from './thumbnail'

export const App = () => {
  const [thumbnailClass, setThumbnailClass] = useState('thumbnail')
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

  useEffect(() => {
    setTimeout(() => setThumbnailClass('thumbnail thumbnail-off'), 1000)
  }, [])

  return (
    <>
      <Thumbnail className={thumbnailClass} />
      <div className="app">
        <CountrySelect />
        <div className="app-stats">
          <RecentStats />
          <PeakRecovered />
        </div>
      </div>
    </>
  )
}
