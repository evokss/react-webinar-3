import React, { useEffect, useState } from 'react';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import List from '../list';
import Pagination from '../pagination';
import Item from '../item';

const CatalogPage = ({ addToBasket }) => {
  const store = useStore();
  const { list, totalCount, limit } = useSelector(state => state.catalog);

  const [currentPage, setCurrentPage] = useState(1);
  const skipValue = (currentPage - 1) * limit;

  useEffect(() => {
    store.actions.catalog.load(limit, skipValue);
  }, [currentPage, store.actions.catalog, limit, skipValue]);

  const renderItem = (item) => {
    return <Item item={item} onAdd={addToBasket} />;
  };

  return (
    <div>
      <List
        list={list}
        renderItem={renderItem}
      />
      <Pagination
        totalCount={totalCount}
        limit={limit}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default CatalogPage;