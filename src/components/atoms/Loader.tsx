import { Loader as LoaderIcon } from 'lucide-react';

interface LoaderProps {
  size?: number;
  className?: string;
}

export const Loader = ({ size = 24, className = '' }: LoaderProps) => {
  return (
    <div className={`flex items-center justify-center ${className}`} data-testid="loader">
      <LoaderIcon className="animate-spin text-primary" size={size} />
    </div>
  );
};
