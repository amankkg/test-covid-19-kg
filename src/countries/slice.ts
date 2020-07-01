import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

import {fetchApi, storage} from 'src/services'

const initialState = {
  list: [] as Country[],
  selected: '',
  pending: false,
  error: undefined as string | undefined,
}

export const selectCountry = createAsyncThunk(
  'selectCountry',
  async (country?: string) => {
    if (!country) {
      const cache = await storage.read('selectedCountry')

      country = cache || 'kyrgyzstan'
    }

    await storage.write('selectedCountry', country)

    return country!
  },
)

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

export const {actions, reducer} = createSlice({
  name: 'countries',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(selectCountry.fulfilled, (state, action) => {
        state.selected = action.payload
      })
      .addCase(fetchCountries.pending, (state, action) => {
        state.pending = true
        delete state.error
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.pending = false
        state.list = action.payload
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.pending = false
        state.error = action.error.message ?? 'Error fetching countries list'
      }),
})
