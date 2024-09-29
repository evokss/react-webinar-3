import { memo, useCallback, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageLayout from '../../components/page-layout';
import Head from '../../components/head';
import BasketTool from '../../components/basket-tool';
import CatalogPage from '../../components/catalog-page';
import useStore from '../../store/use-store';
import useSelector from '../../store/use-selector';
import ProductPage from '../../components/product-page';

function Main() {
  const store = useStore();
  const [pageTitle, setPageTitle] = useState("Магазин");

  useEffect(() => {
    store.actions.catalog.load();
  }, [store]);

  const select = useSelector(state => ({
    amount: state.basket.amount,
    sum: state.basket.sum,
    totalCount: state.catalog.totalCount,
    limit: 10,
  }));

  const callbacks = {
    addToBasket: useCallback(_id => store.actions.basket.addToBasket(_id), [store]),
    openModalBasket: useCallback(() => store.actions.modals.open('basket'), [store]),
  };

  return (
    <Router>
      <PageLayout>
        <Head title={pageTitle} />
        <BasketTool onOpen={callbacks.openModalBasket} amount={select.amount} sum={select.sum} />
        <Routes>
          <Route path="/" element={
            <CatalogPage 
              addToBasket={callbacks.addToBasket}
              setPageTitle={setPageTitle}
            />
          } />
          <Route path="/product/:id" element={<ProductPage setPageTitle={setPageTitle} />} />
        </Routes>
      </PageLayout>
    </Router>
  );
}

export default memo(Main);
