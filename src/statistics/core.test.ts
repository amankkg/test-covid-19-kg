import {findPeakRecover, getRecentStatistics} from './core'

const statistics: StatisticsEntry[] = [
  {
    confirmed: 60382,
    deaths: 0,
    recovered: 41400,
    active: 60382,
    date: 1592956800000,
  },
  {
    confirmed: 60382,
    deaths: 367,
    recovered: 41448,
    active: 18567,
    date: 1593043200000,
  },
  {
    confirmed: 60713,
    deaths: 373,
    recovered: 42689,
    active: 17651,
    date: 1593129600000,
  },
  {
    confirmed: 61095,
    deaths: 377,
    recovered: 44126,
    active: 16592,
    date: 1593216000000,
  },
  {
    confirmed: 61475,
    deaths: 383,
    recovered: 45027,
    active: 16065,
    date: 1593302400000,
  },
  {
    confirmed: 61790,
    deaths: 387,
    recovered: 45213,
    active: 16190,
    date: 1593388800000,
  },
  {
    confirmed: 62118,
    deaths: 392,
    recovered: 46054,
    active: 15672,
    date: 1593475200000,
  },
]

test('findPeakRecover', () => {
  expect(findPeakRecover(statistics)).toMatchInlineSnapshot(`
    Array [
      2020-06-27T00:00:00.000Z,
      1437,
    ]
  `)
})

test('getRecentStatistics', () => {
  expect(getRecentStatistics(statistics)).toMatchInlineSnapshot(`
    Array [
      Object {
        "active": 15672,
        "confirmed": 62118,
        "date": 1593475200000,
        "deaths": 392,
        "recovered": 46054,
      },
      Object {
        "active": 16190,
        "confirmed": 61790,
        "date": 1593388800000,
        "deaths": 387,
        "recovered": 45213,
      },
      Object {
        "active": 16065,
        "confirmed": 61475,
        "date": 1593302400000,
        "deaths": 383,
        "recovered": 45027,
      },
      Object {
        "active": 16592,
        "confirmed": 61095,
        "date": 1593216000000,
        "deaths": 377,
        "recovered": 44126,
      },
      Object {
        "active": 17651,
        "confirmed": 60713,
        "date": 1593129600000,
        "deaths": 373,
        "recovered": 42689,
      },
    ]
  `)
})
