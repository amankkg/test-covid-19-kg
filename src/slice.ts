import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
import {storage} from './services'

const initialState = {
  pendingCount: 0,
  countries: [] as Country[],
  country: '',
}

const API = 'https://api.covid19api.com'

const fetchCountries = createAsyncThunk('fetchCountries', async () => {
  const cached = await storage.read('countries')

  if (cached) return cached

  const response = await fetch(API + '/countries')

  if (!response.ok) throw new Error(response.statusText)

  const data = await response.json()

  const countries: Country[] = data.map((country: any) => ({
    country: country.Country,
    slug: country.Slug,
    iso2: country.ISO2,
  }))

  await storage.write('countries', countries)

  return countries
})

const restoreSelectedCountry = createAsyncThunk(
  'restoreSelectedCountry',
  async () => {
    const cached = await storage.read('selectedCountry')

    if (cached) return cached

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
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.pendingCount -= 1
        state.countries = action.payload
      })
      .addCase(fetchCountries.rejected, (state, action) => {
        state.pendingCount -= 1
      }),
})

export const thunks = {
  fetchCountries,
  restoreSelectedCountry,
  selectCountry,
}
