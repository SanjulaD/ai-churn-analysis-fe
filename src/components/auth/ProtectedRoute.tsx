import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Loader } from '@/components/atoms/Loader';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [checking, setChecking] = React.useState(true);

  useEffect(() => {
    // Short timeout to prevent flash of loading state for already logged in users
    const timer = setTimeout(() => {
      if (!isLoggedIn) {
        navigate('/login');
      }
      setChecking(false);
    }, 100);

    return () => clearTimeout(timer);
  }, [isLoggedIn, navigate]);

  if (checking) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader size={40} />
      </div>
    );
  }

  return isLoggedIn ? <>{children}</> : null;
};
