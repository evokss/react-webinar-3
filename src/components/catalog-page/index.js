import React, { useEffect, useState } from 'react';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import List from '../list'; // Импортируем обновленный List
import Item from '../item'; // Импортируем Item

const CatalogPage = () => {
  const store = useStore();
  const { list, totalCount, limit } = useSelector(state => state.catalog);

  // Текущая страница (устанавливаем начальное значение как 1)
  const [currentPage, setCurrentPage] = useState(1);

  // Подсчет количества пропускаемых элементов для соответствующей страницы
  const skipValue = (currentPage - 1) * limit;

  useEffect(() => {
    // Загружаем элементы при изменении страницы
    store.actions.catalog.load(limit, skipValue);
  }, [currentPage]); // Загрузка данных при смене текущей страницы

  // Функция для рендеринга элемента с использованием компонента Item
  const renderItem = item => (
    <Item 
      item={item} 
      onAdd={(id) => store.actions.basket.addToBasket(id)} // Передаем функцию добавления
    />
  );

  return (
    <div>
      {/* Используем обновленный List с пагинацией */}
      <List
        list={list}
        renderItem={renderItem}
        currentPage={currentPage}
        totalCount={totalCount}
        limit={limit}
        onPageChange={setCurrentPage} // Обновление текущей страницы
      />
    </div>
  );
};

export default CatalogPage;
