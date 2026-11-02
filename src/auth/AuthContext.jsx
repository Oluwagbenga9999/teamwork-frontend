import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { api } from '../api';

const AuthContext = createContext(null);

function decodeToken(token) {
  try {
    const payload = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
}

function readSession() {
  const token = localStorage.getItem('token');
  if (!token) return null;
  const payload = decodeToken(token);
  if (!payload || (payload.exp && payload.exp * 1000 < Date.now())) {
    localStorage.removeItem('token');
    return null;
  }
  return { token, userId: payload.userId, email: payload.email, isAdmin: payload.isAdmin };
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readSession);

  const signIn = useCallback(async (email, password) => {
    const data = await api.signIn({ email, password });
    localStorage.setItem('token', data.token);
    setUser(readSession());
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('token');
    setUser(null);
  }, []);

  const value = useMemo(() => ({ user, signIn, signOut }), [user, signIn, signOut]);
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  return useContext(AuthContext);
}