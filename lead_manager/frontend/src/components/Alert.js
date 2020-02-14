import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { withAlertContext } from '../AlertContext'

class Alert extends Component {
  static propTypes = {
    show: PropTypes.func.isRequired,
    errors: PropTypes.object.isRequired,
    messages: PropTypes.object.isRequired
  }

  /*
  componentDidMount() {
    // show(msg) is defined in AlertProvider.
    this.props.show('Error')
  }
  */

  componentDidUpdate(prevProps) {
    const { errors, show, messages } = this.props
    if (errors !== prevProps.errors) {
      if (errors.msg.name) show(`Name: ${errors.msg.name.join()}`)
      if (errors.msg.email) show(`Email: ${errors.msg.email.join()}`)
      if (errors.msg.message) show(`Message: ${errors.msg.message.join()}`)
    }

    if (messages !== prevProps.messages) {
      if (messages.leadDeleted) show(`Success: ${messages.leadDeleted}`)
      if (messages.leadAdded) show(`Success: ${messages.leadAdded}`)
      if (messages.passwordNotMatch) {
        show(`Error: ${messages.passwordNotMatch}`)
      }
    }

    if (errors.msg.non_field_errors) {
      show(errors.msg.non_field_errors.join())
    }
    if (errors.msg.username) show(errors.msg.username.join())
  }

  render() {
    return <React.Fragment />
  }
}

const mapStateToProps = (state) => ({
  errors: state.errorsReducer,
  messages: state.messagesReducer
})

// Call withAlertContext to get this Alert component wrapped so that it could be able to visit show(msg) in this.props without knowing the code.
export default connect(mapStateToProps)(withAlertContext(Alert))
