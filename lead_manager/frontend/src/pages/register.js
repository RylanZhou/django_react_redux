import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { register } from '../actions/auth'
import { createMessage } from '../actions/messages'

class Register extends Component {
  static propTypes = {
    register: PropTypes.func.isRequired,
    createMessage: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
  }

  state = {
    username: '',
    email: '',
    password: '',
    password2: ''
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    const { username, email, password, password2 } = this.state
    if (password !== password2) {
      this.props.createMessage({ passwordNotMatch: 'Passwords do not match.' })
      return
    }
    this.props.register({
      username,
      email,
      password
    })
  }

  render() {
    if (this.props.isAuthenticated) {
      return <Redirect to="/" />
    }

    const { username, email, password, password2 } = this.state
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label>Name: </label>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <label>Email: </label>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <label>Password: </label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <label>Confirm: </label>
          <input
            type="password"
            name="password2"
            placeholder="Confirm"
            value={password2}
            onChange={this.handleChange}
          />
        </div>
        <button>Register</button>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    )
  }
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.authReducer.isAuthenticated
})

export default connect(mapStateToProps, { register, createMessage })(Register)
