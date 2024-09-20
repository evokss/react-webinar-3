import React from 'react';
import PropTypes from 'prop-types';
import { plural } from '../../utils';
import './style.css';

function Controls({ totalUniqueItems, totalPrice, onToggleCartModal }) {
  const isEmpty = totalUniqueItems === 0;

  const itemWord = plural(totalUniqueItems, {
    one: 'товар',
    few: 'товара',
    many: 'товаров'
  });

  return (
    <div className="Controls">
      <div className="Controls-cart">В корзине: </div>
      <div className="Controls-totalItemsPrice">
        {isEmpty ? 'пусто' : `${totalUniqueItems} ${itemWord} / ${totalPrice} ₽`}
      </div>
      <div className="Controls-actions">
        <button className='Controls-actions-btn' onClick={onToggleCartModal}>
          Перейти
        </button>
      </div>
    </div>
  );
}

Controls.propTypes = {
  totalUniqueItems: PropTypes.number.isRequired,
  totalPrice: PropTypes.number.isRequired,
  onToggleCartModal: PropTypes.func.isRequired,
};

Controls.defaultProps = {
  totalUniqueItems: 0,
  totalPrice: 0,
  onToggleCartModal: () => {},
};

export default React.memo(Controls);
