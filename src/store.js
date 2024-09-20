import { generateCode } from './utils';

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = initState;
    this.listeners = []; // Слушатели изменений состояния
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

  addToCart(itemCode) {
    const item = this.state.list.find(i => i.code === itemCode);
    const cartItem = this.state.cart.find(i => i.code === itemCode);

    if (cartItem) {
      this.setState({
        ...this.state,
        cart: this.state.cart.map(i =>
          i.code === itemCode ? { ...i, quantity: i.quantity + 1 } : i
        ),
      });
    } else {
      this.setState({
        ...this.state,
        cart: [...this.state.cart, { ...item, quantity: 1 }],
      });
    }
  }

  removeFromCart(itemCode) {
    this.setState({
      ...this.state,
      cart: this.state.cart.filter(i => i.code !== itemCode),
    });
  }

  toggleCartModal() {
    this.setState({
      ...this.state,
      isCartOpen: !this.state.isCartOpen,
    });
  }
}

export default Store;
