import { codeGenerator } from '../../utils';
import StoreModule from '../module';

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
  }

  initState() {
    return {
      list: [],
    };
  }

  async load(limit = 10, skip = 0) {
    try {
      const response = await fetch(`/api/v1/articles?limit=${limit}&skip=${skip}&fields=items(_id,title,price),count`);
      const json = await response.json();
  
      this.setState(
        {
          ...this.getState(),
          list: json.result.items, // Список товаров
          totalCount: json.result.count, // Общее количество товаров
          limit, // Количество товаров на странице
          skip,  // Текущее смещение (страница)
        },
        'Загружены товары с пагинацией',
      );
    } catch (error) {
      console.error('Ошибка загрузки товаров:', error); // Ловим ошибки запроса
    }
  }
  
}

export default Catalog;
