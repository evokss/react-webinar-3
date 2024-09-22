import React from 'react';
import PropTypes from 'prop-types';
import ModalLayout from '../modal-layout';
import List from '../list';
import { formatPrice } from '../../utils';
import { cn as bem } from '@bem-react/classname';
import './style.css';

const cn = bem('CartModal');

function CartModal({
  cart = [],
  onRemoveFromCart = () => {},
  onClose = () => {},
}) {
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <ModalLayout onClose={onClose}>
      <div className={cn('header')}>
        <h1>Корзина</h1>
        <button className={cn('close-btn')} onClick={onClose}>Закрыть</button>
      </div>
      <div className={cn('header-border')}></div>
      <div className={cn('list')}>
        <List list={cart} onRemoveFromCart={onRemoveFromCart} isCart />
      </div>
      <div className={cn('total')}>
        <p>Итого</p>
        <div>{formatPrice(totalPrice)}</div>
      </div>
    </ModalLayout>
  );
}

CartModal.propTypes = {
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      quantity: PropTypes.number.isRequired,
    }),
  ).isRequired,
  onRemoveFromCart: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default React.memo(CartModal);
