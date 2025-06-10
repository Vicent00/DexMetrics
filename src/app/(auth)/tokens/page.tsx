import TokensList from '@/app/components/TokensList';
import { mockTokens } from '@/app/mock/tokens';

export default async function TokensPage() {
  // Simulamos un pequeño delay para mostrar el estado de carga
  await new Promise(resolve => setTimeout(resolve, 1000));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Tokens</h1>
      </div>
      
      <TokensList 
        tokens={mockTokens} 
        error={undefined}
        isLoading={false}
      />
    </div>
  );
} 