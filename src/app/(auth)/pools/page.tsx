import { createClient, gql } from 'urql';
import { cacheExchange, fetchExchange } from '@urql/core';
import PoolsList from '../../components/PoolsList';

const client = createClient({
  url: 'https://gateway.thegraph.com/api/subgraphs/id/FbCGRftH4a3yZugY7TnbYgPJVEv2LvMT6oF1fxPe9aJM',
  fetchOptions: {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_GRAPH_API_KEY}`,
    },
  },
  exchanges: [cacheExchange, fetchExchange],
});

const POOLS_QUERY = gql`
  query {
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

export default async function PoolsPage() {
  const result = await client.query(POOLS_QUERY, {}).toPromise();

  if (result.error) {
    return (
      <div className="p-4 bg-red-50 text-red-800 rounded-lg">
        <p>Error: {result.error.message}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-8">
      <h1 className="text-2xl  text-gray-900 font-bold mb-4">Pools</h1>
      <PoolsList pools={result.data?.pools || []} />
    </div>
  );
} 