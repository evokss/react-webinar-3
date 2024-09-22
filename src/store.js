import { generateCode } from './utils';

/**
 * Хранилище состояния приложения
 */
class Store {
  constructor(initState = {}) {
    this.state = {
      ...initState,
      totalUniqueItems: 0,
      totalPrice: 0,
    };
    this.listeners = []; // Слушатели изменений состояния
    this.updateTotals(); // Инициализация
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
    this.updateTotals(); // Обновляем суммы при изменении состояния
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

  // Обновление количества уникальных товаров и общей суммы
  updateTotals() {
    const totalUniqueItems = this.state.cart.length;
    const totalPrice = this.state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    
    this.state.totalUniqueItems = totalUniqueItems;
    this.state.totalPrice = totalPrice;
  }
}

export default Store;
