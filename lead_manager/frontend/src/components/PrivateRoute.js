import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

function PrivateRoute({ component: Component, auth, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (auth.isLoading) {
          return <h2>Loading...</h2>
        } else if (!auth.isAuthenticated) {
          // Haven't logged in.
          return <Redirect to="/login" />
        }
        return <Component {...props} />
      }}
    />
  )
}

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
  component: PropTypes.object
}

const mapStateToProps = (state) => ({
  auth: state.authReducer
})

export default connect(mapStateToProps)(PrivateRoute)
