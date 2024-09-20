import React from 'react';
import PropTypes from 'prop-types';
import CardModalItem from '../cart-modal-item';
import './style.css';

function CartModal({ cart, onRemoveFromCart, onClose }) {
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="CartModal-overlay" onClick={onClose}> {/* Затемненный фон */}
      <div className="CartModal" onClick={(e) => e.stopPropagation()}> {/* Окно, которое не закрывается при клике внутри */}
        <div className="CartModal-header">
          <h1>Корзина</h1>
          <button onClick={onClose}>Закрыть</button>
        </div>
        <div className="CartModal-header-border"></div>
        <div className="CartModal-list">
          {cart.map(item => (
            <CardModalItem
              key={item.code}
              item={item}
              onRemoveFromCart={onRemoveFromCart}
            />
          ))}
        </div>
        <div className="CartModal-total">
          <p>Итого</p>
          <div>{totalPrice} ₽</div>
        </div>
      </div>
    </div>
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

CartModal.defaultProps = {
  cart: [],
  onRemoveFromCart: () => {},
  onClose: () => {},
};

export default React.memo(CartModal);
