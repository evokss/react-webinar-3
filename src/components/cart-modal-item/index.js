import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function CartModalItem({ item, onRemoveFromCart }) {
  return (
  <div className="CartModalItem">
    <div className="CartModalItem-code">{item.code}</div>
    <div className="CartModalItem-title">{item.title}</div>
    <div className="CartModalItem-price">{item.price} ₽</div>
    <div className="CartModalItem-quantity">{item.quantity} шт</div>
    <div className="CartModalItem-actions">
      <button onClick={() => onRemoveFromCart(item.code)}>Удалить</button>
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

CartModalItem.defaultProps = {
  item: {
    code: 0,
    title: 'Товар',
    price: 0,
    quantity: 1,
  },
  onRemoveFromCart: () => {},
};

export default React.memo(CartModalItem);
