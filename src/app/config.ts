export const config = {
  graphApiUrl: process.env.NEXT_PUBLIC_GRAPH_API_URL || 'https://gateway.thegraph.com/api/v2/subgraphs/name/uniswap/uniswap-v3',
  graphApiKey: process.env.NEXT_PUBLIC_GRAPH_API_KEY || '',
}; 