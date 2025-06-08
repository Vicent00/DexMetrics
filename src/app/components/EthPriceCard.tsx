import React from 'react';

interface EthPriceCardProps {
  price: string;
}

const EthPriceCard: React.FC<EthPriceCardProps> = ({ price }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center space-x-2">
        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
        <span className="text-sm text-gray-500">ETH Price</span>
      </div>
      <p className="text-xl font-bold text-gray-800 mt-1">
        ${parseFloat(price).toFixed(2)}
      </p>
    </div>
  );
};

export default EthPriceCard; 