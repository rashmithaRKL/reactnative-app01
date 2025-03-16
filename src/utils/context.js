import React, { createContext, useContext, useReducer } from 'react';

// Initial state
const initialState = {
  user: null,
  cart: [],
  isLoading: false,
  error: null,
  theme: 'light'
};

// Action types
const ActionTypes = {
  SET_USER: 'SET_USER',
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  UPDATE_CART_ITEM: 'UPDATE_CART_ITEM',
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  TOGGLE_THEME: 'TOGGLE_THEME',
  CLEAR_CART: 'CLEAR_CART',
  LOGOUT: 'LOGOUT'
};

// Reducer
function reducer(state, action) {
  switch (action.type) {
    case ActionTypes.SET_USER:
      return { ...state, user: action.payload };
    case ActionTypes.ADD_TO_CART:
      const existingItem = state.cart.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }]
      };
    case ActionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart.filter(item => item.id !== action.payload)
      };
    case ActionTypes.UPDATE_CART_ITEM:
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };
    case ActionTypes.SET_LOADING:
      return { ...state, isLoading: action.payload };
    case ActionTypes.SET_ERROR:
      return { ...state, error: action.payload };
    case ActionTypes.TOGGLE_THEME:
      return { ...state, theme: state.theme === 'light' ? 'dark' : 'light' };
    case ActionTypes.CLEAR_CART:
      return { ...state, cart: [] };
    case ActionTypes.LOGOUT:
      return { ...initialState };
    default:
      return state;
  }
}

// Create context
const AppContext = createContext(null);

// Context provider component
export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = {
    ...state,
    setUser: (user) => dispatch({ type: ActionTypes.SET_USER, payload: user }),
    addToCart: (product) => dispatch({ type: ActionTypes.ADD_TO_CART, payload: product }),
    removeFromCart: (productId) => dispatch({ type: ActionTypes.REMOVE_FROM_CART, payload: productId }),
    updateCartItem: (id, quantity) => dispatch({ type: ActionTypes.UPDATE_CART_ITEM, payload: { id, quantity } }),
    setLoading: (isLoading) => dispatch({ type: ActionTypes.SET_LOADING, payload: isLoading }),
    setError: (error) => dispatch({ type: ActionTypes.SET_ERROR, payload: error }),
    toggleTheme: () => dispatch({ type: ActionTypes.TOGGLE_THEME }),
    clearCart: () => dispatch({ type: ActionTypes.CLEAR_CART }),
    logout: () => dispatch({ type: ActionTypes.LOGOUT })
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

// Custom hook for using the context
export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
