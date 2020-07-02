import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

import {fetchApi, storage} from '../services'

const initialState = {
  data: [] as StatisticsEntry[],
  pending: false,
  error: undefined as string | undefined,
}

type CacheData = {
  [key: string]: {
    date: number
    history: StatisticsEntry[]
  }
}

export const fetchStatistics = createAsyncThunk(
  'fetchStatistics',
  async (country: string) => {
    const date = new Date().setHours(0, 0, 0, 0)

    let cache: CacheData = await storage.read('statistics')

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

export const {actions, reducer} = createSlice({
  name: 'statistics',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchStatistics.pending, (state, action) => {
        state.pending = true
        delete state.error
      })
      .addCase(fetchStatistics.fulfilled, (state, action) => {
        state.pending = false
        state.data = action.payload
      })
      .addCase(fetchStatistics.rejected, (state, action) => {
        state.pending = false
        state.error = action.error.message ?? 'Error fetching statistics'
      }),
})
