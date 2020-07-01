import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {storage} from './services'

const initialState = {
  countries: [] as Country[],
  country: '',
  statistics: [] as StatisticsEntry[],
  pendingCount: 0,
  errors: {} as {[key: string]: string},
}

const API = 'https://api.covid19api.com'

const fetchCountries = createAsyncThunk('fetchCountries', async () => {
  const cache = await storage.read('countries')

  if (cache) return cache

  const response = await fetch(API + '/countries')

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

const restoreSelectedCountry = createAsyncThunk(
  'restoreSelectedCountry',
  async () => {
    const cache = await storage.read('selectedCountry')

    if (cache) return cache

    return 'kyrgyzstan'
  },
)

const selectCountry = createAsyncThunk(
  'selectCountry',
  async (country: string) => {
    await storage.write('selectedCountry', country)

    return country
  },
)

const fetchStatistics = createAsyncThunk(
  'fetchStatistics',
  async (country: string) => {
    const date = new Date().setHours(0, 0, 0, 0)

    let cache = await storage.read('statistics')

    if (!cache) cache = {}

    if (cache[country]?.date === date) return cache[country].history

    const response = await fetch(API + '/total/dayone/country/' + country)

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

export const {actions, reducer} = createSlice({
  name: 'app',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(restoreSelectedCountry.fulfilled, (state, action) => {
        state.country = action.payload
      })
      .addCase(selectCountry.fulfilled, (state, action) => {
        state.country = action.payload
      })
      .addCase(fetchCountries.pending, (state, action) => {
        state.pendingCount += 1
        delete state.errors['fetchCountries']
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.pendingCount -= 1
        state.countries = action.payload
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.pendingCount -= 1
        state.errors['fetchCountries'] =
          action.error.message ?? 'Error fetching countries list'
      })
      .addCase(fetchStatistics.pending, (state, action) => {
        state.pendingCount += 1
        delete state.errors['fetchStatistics']
      })
      .addCase(fetchStatistics.fulfilled, (state, action) => {
        state.statistics = action.payload
        state.pendingCount -= 1
      })
      .addCase(fetchStatistics.rejected, (state, action) => {
        state.pendingCount -= 1
        state.errors['fetchStatistics'] =
          action.error.message ?? 'Error fetching statistics'
      }),
})

export const thunks = {
  fetchCountries,
  restoreSelectedCountry,
  selectCountry,
  fetchStatistics,
}
