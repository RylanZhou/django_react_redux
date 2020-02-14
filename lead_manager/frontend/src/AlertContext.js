import React, { Component } from 'react'
import PropTypes from 'prop-types'

const AlertContext = React.createContext()

export class AlertProvider extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.array, PropTypes.object])
  }

  show = (msg) => {
    alert(msg)
  }

  render() {
    return (
      <AlertContext.Provider
        value={{
          show: this.show
        }}
      >
        {this.props.children}
      </AlertContext.Provider>
    )
  }
}

const AlertConsumer = AlertContext.Consumer

// Wrap any customized Alert component and pass the show function to its props.
export const withAlertContext = (Element) => {
  return class WrappedAlert extends Component {
    render() {
      // {...this.props} is to keep the original props that the Element carries.
      return (
        <AlertConsumer>
          {(value) => <Element show={value.show} {...this.props} />}
        </AlertConsumer>
      )
    }
  }
}
