/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния

    // Наибольший код в исходном списке
    this.highestCode = Math.max(0, ...this.state.list.map(item => item.code));

    // Счетчик выбора для всех элементов на 0
    this.state.list = this.state.list.map(item => ({
      ...item,
      selectionCount: 0,
    }));
  }

  /**
   * Подписка слушателя на изменения состояния
   * @param listener {Function}
   * @returns {Function} Функция отписки
   */
  subscribe(listener) {
    this.listeners.push(listener);
    // Возвращается функция для удаления добавленного слушателя
    return () => {
      this.listeners = this.listeners.filter(item => item !== listener);
    };
  }

  /**
   * Выбор состояния
   * @returns {Object}
   */
  getState() {
    return this.state;
  }

  /**
   * Установка состояния
   * @param newState {Object}
   */
  setState(newState) {
    this.state = newState;
    // Вызываем всех слушателей
    for (const listener of this.listeners) listener();
  }

  /**
   * Добавление новой записи
   */
  addItem() {
    // Увеличиваем на 1 код записи, чтобы гарантировать его уникальность в рамках сессии
    this.highestCode += 1;

    this.setState({
      ...this.state,

      // Используем уникальный код, добавили счетчик выделений
      list: [...this.state.list, { code: this.highestCode, title: 'Новая запись', selectionCount: 0 }],
    });
  }

  /**
   * Удаление записи по коду
   * @param code
   */
  deleteItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.filter(item => item.code !== code),
    });
  }

  /**
   * Выделение записи по коду
   * @param code
   */
  selectItem(code) {
    this.setState({
      ...this.state,
      list: this.state.list.map(item => {
        if (item.code === code) {
          return {
            ...item,
            selected: !item.selected,
            selectionCount: item.selected ? item.selectionCount : item.selectionCount + 1, // Увеличие счетчика выдлений при активации
          };
        }
        return {
          ...item,
          selected: false, // Отмена других выделений
        };
      }),
    });
  }
}

export default Store;
