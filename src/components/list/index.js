import { memo } from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import './style.css';
import Pagination from '../pagination';

function List({ list, renderItem, currentPage, totalCount, limit, onPageChange }) {
  return (
    <div className="List">
      {list.map(item => (
        <div key={item._id} className="List-item">
          {renderItem(item)}
        </div>
      ))}
      
      {/* Пагинация */}
      <Pagination
        totalCount={totalCount}
        limit={limit}
        currentPage={currentPage}
        onPageChange={onPageChange} // Обновление текущей страницы
      />
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  ).isRequired,
  renderItem: PropTypes.func,
  currentPage: PropTypes.number.isRequired,
  totalCount: PropTypes.number.isRequired,
  limit: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

List.defaultProps = {
  renderItem: item => {},
};

export default memo(List);
