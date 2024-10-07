/**
 * Плюрализация
 * Возвращает вариант с учётом правил множественного числа под указанную локаль
 * @param value {Number} Число, под которое выбирается вариант формы.
 * @param variants {Object<String>} Варианты форм множественного числа.
 * @example plural(5, {one: 'товар', few: 'товара', many: 'товаров'})
 * @param [locale] {String} Локаль (код языка)
 * @returns {String}
 */
export function plural(value, variants = {}, locale = 'ru-RU') {
  // Получаем фурму кодовой строкой: 'zero', 'one', 'two', 'few', 'many', 'other'
  // В русском языке 3 формы: 'one', 'few', 'many', и 'other' для дробных
  // В английском 2 формы: 'one', 'other'
  const key = new Intl.PluralRules(locale).select(value);
  // Возвращаем вариант по ключу, если он есть
  return variants[key] || '';
}

/**
 * Генератор чисел с шагом 1
 * @returns {Function}
 */
export function codeGenerator(start = 0) {
  return () => ++start;
}

/**
 * Форматирование разрядов числа
 * @param value {Number}
 * @param options {Object}
 * @returns {String}
 */
export function numberFormat(value, locale = 'ru-RU', options = {}) {
  return new Intl.NumberFormat(locale, options).format(value);
}

export function sortCategories(arr) {
  let newCategories = arr.filter(category => !category.parent);
  let categoriesChild = arr.filter(category => category.parent);

  while (categoriesChild.length > 0) {
    let sortedCategories = [];
    categoriesChild.map(category => (category.title = `- ${category.title}`));
    newCategories.forEach(element => {
      sortedCategories.push(element);
      categoriesChild.map(category => {
        if (category.parent._id == element._id) {
          sortedCategories.push(category);
        }
      });
      categoriesChild = categoriesChild.filter(
        category => element._id != category.parent._id,
      );
    });
    newCategories = sortedCategories;
  }
  return newCategories;

}
