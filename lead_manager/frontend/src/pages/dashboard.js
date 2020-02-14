import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { logout } from '../actions/auth'

import AddLead from '../components/AddLead'
import LeadsList from '../components/LeadsList'

class dashboard extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    logout: PropTypes.func.isRequired
  }

  render() {
    const { user } = this.props.auth
    return (
      <React.Fragment>
        <AddLead />
        <LeadsList />
        <span>Welcome, {user.username}</span>
        <button onClick={this.props.logout}>Log OUT</button>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.authReducer
})

export default connect(mapStateToProps, { logout })(dashboard)
