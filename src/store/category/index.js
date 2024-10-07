import StoreModule from '../module';

class CategoryState extends StoreModule {

  initState() {
    return {
      waiting: false,
      allCategories: [],
    };
  }

  async getCategory() {

    this.setState(
      {
        ...this.getState(),
        waiting: true,
      }
    )

    //Запрашиваем все категории
    try {
      const getCategoies = await fetch(`/api/v1/categories?fields=_id,title,parent(_id)&limit=*`);
      const categoriesJson = await getCategoies.json()
  
   
      this.setState(
        {
          ...this.getState(),
          allCategories: categoriesJson.result.items,
          waiting: false,
        },
        'Загружены категории товаров из АПИ',
      );

    }
    catch(e) {
      console.log(e)
    }
  }
}

export default CategoryState;
