import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import CartModalItem from '../cart-modal-item';
import './style.css';

function List({
  list,
  onAddToCart = () => {},
  onRemoveFromCart = () => {},
  isCart = false,
}) {
  return (
    <div className="List">
      {list.map(item => (
        <div key={item.code} className="List-item">
          {isCart ? (
            <CartModalItem item={item} onRemoveFromCart={onRemoveFromCart} />
          ) : (
            <Item item={item} onAddToCart={onAddToCart} />
          )}
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    }),
  ).isRequired,
  onAddToCart: PropTypes.func,
  onRemoveFromCart: PropTypes.func,
  isCart: PropTypes.bool,
};

export default React.memo(List);
