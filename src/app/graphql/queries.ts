import { gql } from 'urql';

export const ANALYTICS_QUERY = gql`
  query AnalyticsQuery($startTime: BigInt!, $endTime: BigInt!) {
    factories(first: 5) {
      id
      poolCount
      txCount
      totalVolumeETH
      totalFeesETH
      totalValueLockedUSD
    }
    bundles(first: 1) {
      ethPriceUSD
    }
    pools(
      first: 20, 
      orderBy: totalValueLockedUSD, 
      orderDirection: desc,
      where: {
        createdAtTimestamp_gte: $startTime,
        createdAtTimestamp_lte: $endTime
      }
    ) {
      id
      token0 {
        symbol
        name
      }
      token1 {
        symbol
        name
      }
      feeTier
      totalValueLockedUSD
      volumeUSD
      createdAtTimestamp
    }
    dailyStats: pools(
      first: 1000,
      orderBy: createdAtTimestamp,
      orderDirection: asc,
      where: {
        createdAtTimestamp_gte: $startTime,
        createdAtTimestamp_lte: $endTime
      }
    ) {
      createdAtTimestamp
      totalValueLockedUSD
      volumeUSD
    }
  }
`; 