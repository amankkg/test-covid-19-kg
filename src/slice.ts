import {createSlice} from '@reduxjs/toolkit'

import * as thunks from './thunks'

const initialState = {
  countries: [] as Country[],
  country: '',
  statistics: [] as StatisticsEntry[],
  pendingCount: 0,
  errors: {} as {[key: string]: string},
}

export const {actions, reducer} = createSlice({
  name: 'app',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(thunks.restoreSelectedCountry.fulfilled, (state, action) => {
        state.country = action.payload
      })
      .addCase(thunks.selectCountry.fulfilled, (state, action) => {
        state.country = action.payload
      })
      .addCase(thunks.fetchCountries.pending, (state, action) => {
        state.pendingCount += 1
        delete state.errors['fetchCountries']
      })
      .addCase(thunks.fetchCountries.fulfilled, (state, action) => {
        state.pendingCount -= 1
        state.countries = action.payload
      })
      .addCase(thunks.fetchCountries.rejected, (state, action) => {
        state.pendingCount -= 1
        state.errors['fetchCountries'] =
          action.error.message ?? 'Error fetching countries list'
      })
      .addCase(thunks.fetchStatistics.pending, (state, action) => {
        state.pendingCount += 1
        delete state.errors['fetchStatistics']
      })
      .addCase(thunks.fetchStatistics.fulfilled, (state, action) => {
        state.statistics = action.payload
        state.pendingCount -= 1
      })
      .addCase(thunks.fetchStatistics.rejected, (state, action) => {
        state.pendingCount -= 1
        state.errors['fetchStatistics'] =
          action.error.message ?? 'Error fetching statistics'
      }),
})
