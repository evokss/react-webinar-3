import StoreModule from '../module';

class LoginState extends StoreModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
        token: localStorage.getItem('token') ? localStorage.getItem('token') : "",
        nameData: {},
        error: {},
        auth: false
    };
  }

  async getMe() {
    const existToken = localStorage.getItem('token')

    if(existToken) {
      this.setState({
        ...this.getState(),
        token: existToken,
        auth: false,
      })
  
      const response = await fetch('/api/v1/users/self?fields=*', {
        headers: {
          'X-token': existToken,
          'Content-Type': 'application/json',
        },
      })
      const res = await response.json()
      this.setState({
        ...this.getState(),
        nameData: res.result.profile,
        auth: true,
      })

    }
  }

  async logIn(body) {
      this.setState({
        ...this.getState(),
        auth: false,
        error: {}
      })
      try {
      const response = await fetch('/api/v1/users/sign', {
          method: "POST",
          headers: {
              'Content-Type': 'application/json',
            },
          body: JSON.stringify(body)
      })
      const res = await response.json()
      
      if(res.result) {
        localStorage.setItem('token', res.result.token)
        this.setState({
          ...this.getState(),
          nameData: res.result.user.profile,
          token: res.result.token,
          auth: true,
          error: {}
        })
      } else {
        this.setState({
          ...this.getState(),
          error: {...res.error, type: res.error.data.issues[0].message},
          auth: false,
        })
      }
    } catch(e) {
      console.log(e)
    }
  }

  async logOut() {
    this.setState({
      ...this.getState(),
      auth: true,
      error: {}
    })
    const token = localStorage.getItem('token')
    try {
      const response = await fetch('/api/v1/users/sign', {
          method: "DELETE",
          headers: {
              'X-Token': token,
              'Content-Type': 'application/json',
            },
      })
      const res = await response.json()
      if(res.result) {
        localStorage.removeItem('token')
        this.setState({
          ...this.getState(),
          nameData: {},
          token: "",
          auth: false,
          error: {}
        })
      } else {
        this.setState({
          ...this.getState(),
          error: {...res.error, type: res.error.data.issues[0].message},
          auth: true,
        })
      }
    } catch(e) {
        console.log(e)
      }
  }

  clearError() {
    this.setState({
      ...this.getState(),
      error: {}
    })
  }

  
}

export default LoginState
