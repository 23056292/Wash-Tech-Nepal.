import React, { createContext, useState, useContext, useEffect } from "react";

// Create Context
const UserContext = createContext();

// API base URL
const API_BASE_URL = "http://localhost:5001/api";

// Provider Component
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check for token on initial load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Verify token and get user data
      fetch(`${API_BASE_URL}/auth/me`, {
        headers: {
          'x-auth-token': token
        }
      })
      .then(response => response.json())
      .then(data => {
        if (data) {
          setCurrentUser({
            id: data._id,
            name: data.name,
            email: data.email,
            role: data.role,
          });
        }
      })
      .catch(err => {
        console.error('Error fetching user:', err);
        localStorage.removeItem('token');
      })
      .finally(() => {
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  // Function to login user
  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.token) {
        // Store token in localStorage
        localStorage.setItem('token', data.token);
        
        // Set current user
        setCurrentUser({
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          role: data.user.role,
        });
        
        return { success: true, user: data.user };
      } else {
        return { success: false, msg: data.msg || 'Login failed' };
      }
    } catch (err) {
      console.error('Login error:', err);
      return { success: false, msg: 'Server error' };
    }
  };

  // Function to register user
  const register = async (name, email, password, role) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, role }),
      });

      const data = await response.json();

      if (data.token) {
        // Store token in localStorage
        localStorage.setItem('token', data.token);
        
        // Set current user
        setCurrentUser({
          id: data.user.id,
          name: data.user.name,
          email: data.user.email,
          role: data.user.role,
        });
        
        return { success: true, user: data.user };
      } else {
        return { success: false, msg: data.msg || 'Registration failed' };
      }
    } catch (err) {
      console.error('Registration error:', err);
      return { success: false, msg: 'Server error' };
    }
  };

  // Function to logout user
  const logout = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    setCurrentUser,
    login,
    register,
    logout,
    loading,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// Custom Hook to use UserContext
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export default UserContext;
