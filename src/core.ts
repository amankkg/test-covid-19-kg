export const getRecentStatistics = (statistics: StatisticsEntry[]) =>
  statistics.slice(-5).reverse()

export const findPeakRecover = (statistics: StatisticsEntry[]) => {
  let peakDate = statistics[0].date
  let peak = 0

  for (let i = 1; i < statistics.length; i++) {
    const current = statistics[i].recovered - statistics[i - 1].recovered

    if (peak >= current) continue

    peakDate = statistics[i].date
    peak = current
  }

  return [new Date(peakDate), peak] as const
}
