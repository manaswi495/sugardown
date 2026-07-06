import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  token: string | null;
  admin: any | null;
  login: (token: string, admin: any) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(localStorage.getItem('adminToken'));
  const [admin, setAdmin] = useState<any | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      // In a real app, you might want to fetch the admin profile here
      // For now, we assume the token is valid until it expires
      setAdmin({ email: 'admin@sugardown.com' });
    } else {
      navigate('/login');
    }
  }, [token, navigate]);

  const login = (newToken: string, newAdmin: any) => {
    localStorage.setItem('adminToken', newToken);
    setToken(newToken);
    setAdmin(newAdmin);
    navigate('/');
  };

  const logout = () => {
    localStorage.removeItem('adminToken');
    setToken(null);
    setAdmin(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ token, admin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
