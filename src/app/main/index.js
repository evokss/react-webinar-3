import { memo, useCallback, useEffect } from 'react';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import CatalogPage from '../../components/catalog-page'; // Импортируем CatalogPage
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';

function Main() {
  const store = useStore();

  useEffect(() => {
    // Загружаем начальные данные каталога
    store.actions.catalog.load();
  }, [store]);

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    totalCount: state.catalog.totalCount, // Общее количество товаров
    limit: 10, // Устанавливаем лимит на 10 элементов на странице
  }));

  const callbacks = {
    // Добавление в корзину
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    // Открытие модалки корзины
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  };

  return (
    <PageLayout>
      <Head title="Магазин" />
      <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
      {/* Заменяем List на CatalogPage и передаем нужные параметры */}
      <CatalogPage 
        addToBasket={callbacks.addToBasket} // Передаем функцию добавления в корзину
      />
    </PageLayout>
  );
}

export default memo(Main);
