import {createAsyncThunk} from '@reduxjs/toolkit'

import {fetchApi, storage} from './services'

export const fetchCountries = createAsyncThunk('fetchCountries', async () => {
  const cache = await storage.read('countries')

  if (cache) return cache

  const response = await fetchApi('/countries')

  if (!response.ok) throw new Error(response.statusText)

  const data = await response.json()

  const countries: Country[] = data.map((country: any) => ({
    country: country.Country,
    slug: country.Slug,
    iso2: country.ISO2,
  }))

  countries.sort((a, b) => a.country.localeCompare(b.country))

  await storage.write('countries', countries)

  return countries
})

export const restoreSelectedCountry = createAsyncThunk(
  'restoreSelectedCountry',
  async () => {
    const cache = await storage.read('selectedCountry')

    if (cache) return cache

    return 'kyrgyzstan'
  },
)

export const selectCountry = createAsyncThunk(
  'selectCountry',
  async (country: string) => {
    await storage.write('selectedCountry', country)

    return country
  },
)

export const fetchStatistics = createAsyncThunk(
  'fetchStatistics',
  async (country: string) => {
    const date = new Date().setHours(0, 0, 0, 0)

    let cache = await storage.read('statistics')

    if (!cache) cache = {}

    if (cache[country]?.date === date) return cache[country].history

    const response = await fetchApi('/total/dayone/country/' + country)

    if (!response.ok) throw new Error(response.statusText)

    const data = await response.json()

    const history: StatisticsEntry[] = data.map((entry: any) => ({
      confirmed: entry.Confirmed,
      deaths: entry.Deaths,
      recovered: entry.Recovered,
      active: entry.Active,
      date: Date.parse(entry.Date),
    }))

    cache[country] = {date, history}

    await storage.write('statistics', cache)

    return history
  },
)
