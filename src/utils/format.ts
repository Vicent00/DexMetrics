export const formatNumber = (num: number | string, isCurrency: boolean = true): string => {
  const value = typeof num === 'string' ? parseFloat(num) : num;
  
  if (value >= 1e9) {
    return `${isCurrency ? '$' : ''}${(value / 1e9).toFixed(1)}B`;
  }
  if (value >= 1e6) {
    return `${isCurrency ? '$' : ''}${(value / 1e6).toFixed(1)}M`;
  }
  if (value >= 1e3) {
    return `${isCurrency ? '$' : ''}${(value / 1e3).toFixed(1)}K`;
  }
  return `${isCurrency ? '$' : ''}${value.toFixed(2)}`;
}; 