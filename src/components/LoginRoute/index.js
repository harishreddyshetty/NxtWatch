import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookie from 'js-cookie'

import NxtWatchContext from '../../NxtWatchContext/NxtWatchContext'
import './index.css'

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
        const loginFormTheme = darkMode ? 'form-dark' : 'form-light'
        const textColor = darkMode ? 'text-light' : 'text-dark'
        const pageTheme = darkMode && 'login-page-dark'

        const loginPageImage = darkMode
          ? 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png'
          : 'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png'

        return (
          <div className={`login-page ${pageTheme}`}>
            <div className={`login-form-container ${loginFormTheme}`}>
              <div className="img-container">
                <img
                  className="websiteLogo"
                  alt="website logo"
                  src={loginPageImage}
                />
              </div>

              <form className="login-form" onSubmit={this.submitForm}>
                <label className={`label-ele ${textColor}`} htmlFor="username">
                  USERNAME
                </label>
                <input
                  className="inputElement"
                  placeholder="Username"
                  onChange={updateUsername}
                  value={username}
                  type="text"
                  id="username"
                />

                <label className={`label-ele ${textColor}`} htmlFor="password">
                  PASSWORD
                </label>
                <input
                  className="inputElement"
                  placeholder="Password"
                  onChange={updatePassword}
                  value={password}
                  type={passwordType}
                  id="password"
                />

                <div>
                  <input
                    className="checkbox-tick"
                    onClick={onClickShowPassword}
                    type="checkbox"
                    id="checkbox"
                  />
                  <label
                    className={`label-ele ${textColor}`}
                    htmlFor="checkbox"
                  >
                    Show Password
                  </label>
                </div>

                {showSubmitError && <p className="error-msg">*{errorMsg}</p>}

                <button className="login-btn" type="submit">
                  Login
                </button>
              </form>
            </div>
          </div>
        )
      }}
    </NxtWatchContext.Consumer>
  )

  render() {
    const jwtToken = Cookie.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return <>{this.renderLoginForm()}</>
  }
}

export default LoginRoute
