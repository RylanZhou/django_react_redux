import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types' // Shortcut: IMPT

import { addLead } from '../actions/leads'

export class AddLead extends Component {
  static propTypes = {
    addLead: PropTypes.func.isRequired
  }

  state = {
    name: '',
    email: '',
    message: ''
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.props.addLead({ ...this.state })
  }

  render() {
    const { name, email, message } = this.state
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label>Name: </label>
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <label>Email: </label>
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <label>Message: </label>
          <input
            type="textarea"
            placeholder="Name"
            name="message"
            value={message}
            onChange={this.handleChange}
          />
        </div>
        <button>Submit</button>
      </form>
    )
  }
}

// We don't have to pass any mapping for props, so we give the first parameter a null.
export default connect(null, { addLead })(AddLead)
