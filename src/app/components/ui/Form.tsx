import React from 'react';

interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  children: React.ReactNode;
}

export const Form: React.FC<FormProps> = ({ onSubmit, children, ...props }) => {
  return (
    <form
      onSubmit={onSubmit}
      className="space-y-4 w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-md"
      {...props}
    >
      {children}
    </form>
  );
};

interface FormInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export const FormInput: React.FC<FormInputProps> = ({
  label,
  error,
  className = '',
  type,
  ...props
}) => {
  // Determinar el valor de autocomplete basado en el tipo de input
  const getAutocomplete = () => {
    switch (type) {
      case 'email':
        return 'email';
      case 'password':
        return 'current-password';
      case 'text':
        return 'off';
      default:
        return undefined;
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error ? 'border-red-500' : 'border-gray-300'
        } ${className}`}
        autoComplete={getAutocomplete()}
        type={type}
        {...props}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

interface FormButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

export const FormButton: React.FC<FormButtonProps> = ({
  children,
  isLoading,
  className = '',
  ...props
}) => {
  return (
    <button
      className={`w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${
        className
      }`}
      disabled={isLoading}
      {...props}
    >
      {isLoading ? (
        <div className="flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
          Cargando...
        </div>
      ) : (
        children
      )}
    </button>
  );
}; 