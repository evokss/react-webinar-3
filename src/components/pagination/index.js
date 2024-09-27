import React from 'react';
import './style.css';

const Pagination = ({ totalCount, limit, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalCount / limit); // Вычисляем общее количество страниц

  // Функция смены страницы
  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return; // Проверяем границы страниц
    onPageChange(newPage); // Обновляем текущую страницу
  };

  // Генерация массива страниц для показа
  const getPages = () => {
    const pages = [];
    pages.push(1); // Первая страница всегда

    if (currentPage > 3) pages.push('...'); // Если активная страница далеко от начала, добавляем троеточие

    for (let i = Math.max(2, currentPage - 2); i <= Math.min(totalPages - 1, currentPage + 2); i++) {
      pages.push(i);
    }

    if (currentPage < totalPages - 3) pages.push('...'); // Если активная страница далеко от конца, добавляем троеточие

    pages.push(totalPages); // Последняя страница всегда

    return pages;
  };

  return (
    <div className="pagination">
      {getPages().map((page, index) =>
        page === '...' ? (
          <span key={index}>...</span>
        ) : (
          <button
            key={index}
            onClick={() => handlePageChange(page)}
            className={`pagination-button ${currentPage === page ? 'active' : ''}`} // Применяем класс для активной страницы
            disabled={currentPage === page}
          >
            {page}
          </button>
        )
      )}
    </div>
  );
};

export default Pagination;
