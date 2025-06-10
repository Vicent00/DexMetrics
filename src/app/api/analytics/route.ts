import { createClient } from 'urql';
import { cacheExchange, fetchExchange } from '@urql/core';
import { ANALYTICS_QUERY } from '../../graphql/queries';
import { processAnalyticsData } from '../../utils/analytics';
import { AnalyticsData } from '../../types/analytics';

const client = createClient({
  url: 'https://gateway.thegraph.com/api/subgraphs/id/FbCGRftH4a3yZugY7TnbYgPJVEv2LvMT6oF1fxPe9aJM',
  fetchOptions: {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_GRAPH_API_KEY}`,
    },
  },
  exchanges: [cacheExchange, fetchExchange],
});

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const timeRange = searchParams.get('timeRange') || '24h';

    // Calcular el timestamp de inicio según el rango de tiempo
    const now = Math.floor(Date.now() / 1000);
    let startTime = now;
    
    switch (timeRange) {
      case '7d':
        startTime = now - (7 * 24 * 60 * 60);
        break;
      case '30d':
        startTime = now - (30 * 24 * 60 * 60);
        break;
      default: // 24h
        startTime = now - (24 * 60 * 60);
    }

    const result = await client.query(ANALYTICS_QUERY, {
      startTime: startTime.toString(),
      endTime: now.toString()
    }).toPromise();
    
    if (result.error) {
      console.error('GraphQL Error:', result.error);
      return new Response(JSON.stringify({ error: 'Error fetching data' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (!result.data) {
      return new Response(JSON.stringify({ error: 'No data received' }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const processedData = processAnalyticsData(result.data as AnalyticsData);

    return new Response(JSON.stringify(processedData), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('API Error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
} 