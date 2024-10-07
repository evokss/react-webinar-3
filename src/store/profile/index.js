import StoreModule from '../module';

class ProfileState extends StoreModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
        token: "",
        profile: {},
        nameData: {},
        error: {},
        done: false
    };
  }


  async getUserInfo(token) {

      this.setState({
        ...this.getState(),
        done: false,
      })

      const tokenLocalStorage = localStorage.getItem('token');
      if(!tokenLocalStorage) return;
  
      const response = await fetch('/api/v1/users/self?fields=*', {
        headers: {
          'X-token': token,
          'Content-Type': 'application/json',
        },
      })
      const res = await response.json()
      this.setState({
        ...this.getState(),
        token: token,
        nameData: res.result,
        profile: res.result.profile,
        done: true,
      })

    }
}

export default ProfileState
