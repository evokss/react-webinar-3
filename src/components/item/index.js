import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

function Item({ item, onAddToCart }) {
  const callbacks = {
    onAddToCart: e => {
      e.stopPropagation();
      onAddToCart(item.code);
    },
  };

  return (
    <div className="Item">
      <div className="Item-code">{item.code}</div>
      <div className="Item-title">{item.title}</div>
      <div className="Item-price">{item.price} ₽</div>
      <div className="Item-actions">
        <button onClick={callbacks.onAddToCart}>Добавить</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    code: PropTypes.number,
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

Item.defaultProps = {
  item: {
    code: 0,
    title: 'Без названия',
    price: 0,
  },
  onAddToCart: () => {},
};

export default React.memo(Item);
