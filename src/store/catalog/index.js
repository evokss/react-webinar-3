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
      totalCount: 0,
      limit: 10,
      skip: 0,
      currentProduct: null,
    };
  }

  async load(limit = 10, skip = 0) {
    try {
      const response = await fetch(`/api/v1/articles?limit=${limit}&skip=${skip}&fields=items(_id,title,price),count`);
      const json = await response.json();
  
      this.setState(
        {
          ...this.getState(),
          list: json.result.items,
          totalCount: json.result.count,
          limit,
          skip,
        },
        'Загружены товары с пагинацией',
      );
    } catch (error) {
      console.error('Ошибка загрузки товаров:', error);
    }
  }
  
  async getProduct(id) {
    try {
      const response = await fetch(`/api/v1/articles/${id}`);
      const json = await response.json();
      
      this.setState(
        {
          ...this.getState(),
          currentProduct: json.result,
        },
        `Загружен товар с id ${id}`,
      );
      
      return json.result;
    } catch (error) {
      console.error(`Ошибка при загрузке товара с id ${id}:`, error);
      return null;
    }
  }
}

export default Catalog;