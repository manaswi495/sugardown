import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { LocalProduct } from '~/lib/products';

export type CartItem = {
  product: LocalProduct;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  addItem: (product: LocalProduct, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('sd_cart');
      if (stored) {
        setItems(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load cart', e);
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage whenever items change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('sd_cart', JSON.stringify(items));
    }
  }, [items, isLoaded]);

  const addItem = (product: LocalProduct, quantity = 1) => {
    setItems((current) => {
      const existing = current.find(i => i.product.id === product.id);
      if (existing) {
        return current.map(i => 
          i.product.id === product.id 
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      return [...current, { product, quantity }];
    });
  };

  const removeItem = (productId: string) => {
    setItems((current) => current.filter(i => i.product.id !== productId));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }
    setItems((current) => 
      current.map(i => i.product.id === productId ? { ...i, quantity } : i)
    );
  };

  const clearCart = () => setItems([]);

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, cartCount, cartTotal }}>
      <div style={{ visibility: isLoaded ? 'visible' : 'hidden' }}>
        {children}
      </div>
    </CartContext.Provider>
  );
}

export function useLocalCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useLocalCart must be used within a CartProvider');
  }
  return context;
}
