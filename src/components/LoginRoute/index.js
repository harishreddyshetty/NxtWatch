import {Component} from 'react'
import Cookie from 'js-cookie'

import NxtWatchContext from '../../NxtWatchContext/NxtWatchContext'

class LoginRoute extends Component {
  state = {
    username: '',
    password: '',
    showPassword: false,
    showSubmitError: false,
    errorMsg: '',
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookie.set('jwt_token', jwtToken, {
      expires: 30,
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderLoginForm = () => (
    <NxtWatchContext.Consumer>
      {value => {
        const {darkMode} = value

        const {
          username,
          password,
          showPassword,
          showSubmitError,
          errorMsg,
        } = this.state

        const updateUsername = event => {
          this.setState({username: event.target.value})
        }

        const updatePassword = event => {
          this.setState({password: event.target.value})
        }

        const onClickShowPassword = () => {
          this.setState(prevState => ({showPassword: !prevState.showPassword}))
        }

        const passwordType = showPassword ? 'text' : 'password'

        const loginPageImage = darkMode
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

        return (
          <div>
            <div>
              <img alt="logo" src={loginPageImage} />

              <form onSubmit={this.submitForm}>
                <label htmlFor="username">USERNAME</label>
                <input
                  onChange={updateUsername}
                  value={username}
                  type="text"
                  id="username"
                />

                <label htmlFor="password">PASSWORD</label>
                <input
                  onChange={updatePassword}
                  value={password}
                  type={passwordType}
                  id="password"
                />

                <input
                  onClick={onClickShowPassword}
                  type="checkbox"
                  id="checkbox"
                />
                <label htmlFor="checkbox">Show Password</label>

                {showSubmitError && <p>{errorMsg}</p>}

                <button type="submit">Login</button>
              </form>
            </div>
          </div>
        )
      }}
    </NxtWatchContext.Consumer>
  )

  render() {
    return <>{this.renderLoginForm()}</>
  }
}

export default LoginRoute
