import { createClient, gql } from 'urql';
import { cacheExchange, fetchExchange } from '@urql/core';
import { NextResponse } from 'next/server';

const client = createClient({
  url: 'https://gateway.thegraph.com/api/subgraphs/id/FbCGRftH4a3yZugY7TnbYgPJVEv2LvMT6oF1fxPe9aJM',
  fetchOptions: {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_GRAPH_API_KEY}`,
    },
  },
  exchanges: [cacheExchange, fetchExchange],
});

const DATA_QUERY = gql`
  query {
    factories(first: 5) {
      id
      poolCount
      txCount
      totalVolumeETH
      totalFeesETH
    }
    bundles(first: 1) {
      ethPriceUSD
    }
    pools(first: 20, orderBy: totalValueLockedUSD, orderDirection: desc) {
      id
      token0 {
        id
        symbol
        name
      }
      token1 {
        id
        symbol
        name
      }
      totalValueLockedUSD
      volumeUSD
      feeTier
      token0Price
      token1Price
    }
  }
`;

export async function GET() {
  try {
    const result = await client.query(DATA_QUERY, {}).toPromise();
    
    if (result.error) {
      return NextResponse.json({ error: result.error.message }, { status: 500 });
    }

    return NextResponse.json(result.data);
  } catch (err) {
    console.error('Error fetching graph data:', err);
    return NextResponse.json({ error: 'Failed to fetch graph data' }, { status: 500 });
  }
} 