import { createClient, gql } from 'urql';
import { cacheExchange, fetchExchange } from '@urql/core';
import ClientDashboard from './components/ClientDashboard';

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

export default async function Page() {
  const result = await client.query(DATA_QUERY, {}).toPromise();

  if (result.error) {
    return (
      <div className="p-4 bg-red-50 text-red-800 rounded-lg">
        <p>Error: {result.error.message}</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl text-gray-900 font-bold mb-8">DEX Analytics Dashboard</h1>
        <ClientDashboard initialData={result.data} />
      </div>
    </main>
  );
}
