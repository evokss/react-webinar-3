import React from 'react';
import { createContext } from 'react';

/**
 * Контекст для Store
 * @type {React.Context<Store>}
 */
export const StoreContext = React.createContext();
export const TitleContext = createContext(null);