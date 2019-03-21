import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'

class Nav extends Component {
 
render()
  {
  return (
    <nav className='nav'>
      <ul>
        <li>
          <NavLink to='/dashboard' exact activeClassName='active'>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to='/add' activeClassName='active'>
            New Question
          </NavLink>
        </li>
    	<li>
          <NavLink to='/Leaderboard' activeClassName='active'>
            Leaderboard
          </NavLink>
        </li>
    	<li>
          <NavLink to='/' activeClassName='active' onClick={() => this.props.dispatch(setAuthedUser(null))}>
            Logout {this.props.authedUser}
          </NavLink>
        </li>
    	<li>
    	</li>
      </ul>
    </nav>
  )
  }
}

function mapStateToProps ({ authedUser }) {
  return {
    authedUser: authedUser,
  }
}


export default connect(mapStateToProps)(Nav)