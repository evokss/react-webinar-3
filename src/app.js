import React, { useCallback } from 'react';
import List from './components/list';
import Controls from './components/controls';
import Head from './components/head';
import PageLayout from './components/page-layout';
import CartModal from './components/cart-modal';

/**
 * Приложение
 * @param store {Store} Хранилище состояния приложения
 * @returns {React.ReactElement}
 */
function App({ store }) {
  const { list, cart, isCartOpen } = store.getState();

  const callbacks = {
    onAddToCart: useCallback(
      code => {
        store.addToCart(code);
      },
      [store],
    ),
    onRemoveFromCart: useCallback(
      code => {
        store.removeFromCart(code);
      },
      [store],
    ),
    onToggleCartModal: useCallback(() => {
      store.toggleCartModal();
    }, [store]),
  };

  const totalUniqueItems = cart.length;
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <PageLayout>
      <Head title="Магазин" />
      <Controls 
        totalUniqueItems={totalUniqueItems}
        totalPrice={totalPrice}
        onToggleCartModal={callbacks.onToggleCartModal}
      />
      <List list={list} onAddToCart={callbacks.onAddToCart} />
      {isCartOpen && <CartModal cart={cart} onRemoveFromCart={callbacks.onRemoveFromCart} onClose={callbacks.onToggleCartModal} />}
    </PageLayout>
  );
}

export default App;
