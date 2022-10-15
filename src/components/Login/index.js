import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'

class Login extends Component {
  state = {username: '', password: ''}

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onClickSubmit = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch('https://apis.ccbp.in/login', options)
    const data = await response.json()
    console.log(response)
    console.log(data.jwt_token)
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    }
  }

  render() {
    const {username, password} = this.state
    return (
      <div className="bg-container">
        <form className="form-container" onSubmit={this.onClickSubmit}>
          <div>
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="website-logo"
            />
          </div>
          <div className="label-container">
            <label htmlFor="username" className="label">
              USERNAME
            </label>
            <input
              type="text"
              className="input"
              placeholder="Username"
              value={username}
              onChange={this.onChangeUsername}
            />
          </div>
          <div className="label-container">
            <label htmlFor="password" className="label">
              PASSWORD
            </label>
            <input
              type="password"
              className="input"
              placeholder="Password"
              value={password}
              onChange={this.onChangePassword}
            />
          </div>
          <div>
            <button type="submit" className="login-button">
              login
            </button>
          </div>
        </form>
      </div>
    )
  }
}

export default Login
