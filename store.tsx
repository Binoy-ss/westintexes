import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Bundle, CartItem, User } from './types';
import { MOCK_BUNDLES } from './constants';

interface StoreContextType {
  user: User | null;
  login: (email: string) => void;
  logout: () => void;
  cart: CartItem[];
  addToCart: (bundle: Bundle) => void;
  removeFromCart: (bundleId: string) => void;
  clearCart: () => void;
  cartTotal: number;
  hasPurchased: (bundleId: string) => boolean;
  purchaseItems: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);

  // Simulate persistence for cart
  useEffect(() => {
    const savedCart = localStorage.getItem('wt_cart');
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to parse cart", e);
      }
    }
    
    const savedUser = localStorage.getItem('wt_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Failed to parse user", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('wt_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('wt_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('wt_user');
    }
  }, [user]);

  const login = (email: string) => {
    // Mock login logic with randomized stats for demo
    setUser({
      id: 'u1',
      name: email.split('@')[0],
      email,
      role: email.startsWith('admin') ? 'admin' : 'user',
      purchasedBundleIds: ['2'], // Mock: User already owns bundle 2
      stats: {
        testsAttended: 45,
        testsPassed: 38,
        testsFailed: 7,
        timeSpent: '128h 45m'
      }
    });
  };

  const logout = () => {
    setUser(null);
  };

  const addToCart = (bundle: Bundle) => {
    if (!cart.some(item => item.bundle.id === bundle.id)) {
      setCart([...cart, { bundle }]);
    }
  };

  const removeFromCart = (bundleId: string) => {
    setCart(cart.filter(item => item.bundle.id !== bundleId));
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((total, item) => total + item.bundle.price, 0);

  const hasPurchased = (bundleId: string) => {
    return user?.purchasedBundleIds.includes(bundleId) || false;
  };

  const purchaseItems = () => {
    if (!user) return;
    const newBundleIds = cart.map(item => item.bundle.id);
    const updatedUser = {
      ...user,
      purchasedBundleIds: [...user.purchasedBundleIds, ...newBundleIds]
    };
    setUser(updatedUser);
    clearCart();
  };

  return (
    <StoreContext.Provider value={{ 
      user, login, logout, 
      cart, addToCart, removeFromCart, clearCart, cartTotal, 
      hasPurchased, purchaseItems 
    }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};