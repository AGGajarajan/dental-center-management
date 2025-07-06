// src/context/AuthContext.jsx

import { createContext, useContext, useEffect, useState } from 'react';
import { initialData } from '../data/mockData';
 

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")) || null);

  useEffect(() => {
    if (!localStorage.getItem("db")) {
      localStorage.setItem("db", JSON.stringify(initialData));
    }
  }, []);

  const login = (email, password) => {
    const db = JSON.parse(localStorage.getItem("db"));
    const found = db.users.find(u => u.email === email && u.password === password);
    if (found) {
      setUser(found);
      localStorage.setItem("user", JSON.stringify(found));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
