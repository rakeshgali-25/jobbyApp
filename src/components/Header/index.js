import './index.css'

import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

class Header extends Component {
  onClickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  render() {
    return (
      <div className="header-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="website-logo"
        />
        <div className="para-container">
          <Link to="/" className="link">
            <p className="para2">Home</p>
          </Link>
          <Link to="/jobs" className="link">
            <p className="para2">Jobs</p>
          </Link>
        </div>
        <div>
          <button
            type="button"
            className="logout-button"
            onClick={this.onClickLogout}
          >
            logout
          </button>
        </div>
      </div>
    )
  }
}

export default withRouter(Header)
