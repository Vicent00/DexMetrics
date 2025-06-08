import { createClient, gql } from 'urql';
import { cacheExchange, fetchExchange } from '@urql/core';
import { NextResponse } from 'next/server';

const client = createClient({
  url: 'https://gateway.thegraph.com/api/subgraphs/id/FbCGRftH4a3yZugY7TnbYgPJVEv2LvMT6oF1fxPe9aJM',
  fetchOptions: {
    headers: {
      Authorization: 'Bearer da50dd755b12aa4b26b62d1aaa365c29',
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
  }
`;

export async function GET() {
  try {
    const result = await client.query(DATA_QUERY, {}).toPromise();
    
    if (result.error) {
      return NextResponse.json({ error: result.error.message }, { status: 500 });
    }

    return NextResponse.json(result.data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
} 