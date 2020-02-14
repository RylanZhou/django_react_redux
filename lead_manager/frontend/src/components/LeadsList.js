import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { getLeads, deleteLead } from '../actions/leads'

export class LeadsList extends Component {
  static propTypes = {
    leads: PropTypes.array.isRequired,
    getLeads: PropTypes.func,
    deleteLead: PropTypes.func
  }

  componentDidMount() {
    this.props.getLeads()
  }

  render() {
    return (
      <table border="1">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Message</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {this.props.leads.map((each) => (
            <tr key={each.id}>
              <td>{each.id}</td>
              <td>{each.name}</td>
              <td>{each.email}</td>
              <td>{each.message}</td>
              <td>
                <button onClick={() => this.props.deleteLead(each.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    )
  }
}

// Make mapping so that we could directly call this.props.leads
const mapStateToProps = (state) => ({
  leads: state.leadsReducer.leads
})

// The first parameter is to mapping common props and the second one is to map the methods in reducers to props. So that we could directly call this.props.getLeads.
export default connect(mapStateToProps, { getLeads, deleteLead })(LeadsList)
