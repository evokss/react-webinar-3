import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useStore from '../../store/use-store';
import { cn as bem } from '@bem-react/classname';
import './style.css';

const ProductPage = ({ setPageTitle }) => {
  const { id } = useParams();
  const store = useStore();
  const [product, setProduct] = useState(null);
  const cn = bem('ProductPage');

  useEffect(() => {
    const fetchProduct = async () => {
      const result = await store.actions.catalog.getProduct(id);
      if (result) {
        setProduct(result);
        setPageTitle(result.title); // Устанавливаем title страницы
      }
    };
    fetchProduct();
  }, [id, store.actions.catalog, setPageTitle]);

  if (!product) return <div>Loading...</div>;

  return (
    <div className={cn()}>
      <p className={cn('description')}>{product.description}</p>
      <p>Страна производитель: <span className={cn('bold-fragment')}>{product.madeIn?._type}</span></p>
      <p>Категория: <span className={cn('bold-fragment')}>{product.category?._type}</span></p>
      <p>Год выпуска: <span className={cn('bold-fragment')}>{product.edition}</span></p>
      <p className={cn('price')}>Цена: {product.price.toFixed(2)} ₽</p>
      <button onClick={() => store.actions.basket.addToBasket(product._id)} className={cn('button')}>
        Добавить
      </button>
    </div>
  );
};

export default ProductPage;