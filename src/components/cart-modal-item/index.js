import React from 'react';
import PropTypes from 'prop-types';
import { formatPrice } from '../../utils';
import { cn as bem } from '@bem-react/classname';
import './style.css';

function CartModalItem({
  item = {
    code: 0,
    title: 'Товар',
    price: 0,
    quantity: 1,
  },
  onRemoveFromCart = () => {},
}) {
  const cn = bem('CartModalItem');

  return (
    <div className={cn()}>
      <div className={cn('code')}>{item.code}</div>
      <div className={cn('title')}>{item.title}</div>
      <div className={cn('price')}>{formatPrice(item.price)}</div>
      <div className={cn('quantity')}>{item.quantity} шт</div>
      <div className={cn('actions')}>
        <button className={cn('actions-delete-btn')} onClick={() => onRemoveFromCart(item.code)}>
          Удалить
        </button>
      </div>
    </div>
  );
}

CartModalItem.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
  onRemoveFromCart: PropTypes.func.isRequired,
};

export default React.memo(CartModalItem);
