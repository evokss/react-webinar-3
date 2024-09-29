import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';

function List({ list, renderItem }) {
  return (
    <div className="List">
      {list.length > 0 ? (
        list.map(item => (
          <div key={item._id} className="List-item">
            {renderItem(item)}
          </div>
        ))
      ) : null}
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  ).isRequired,
  renderItem: PropTypes.func.isRequired, // renderItem должен быть обязательным
};

export default memo(List);
