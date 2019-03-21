import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { setAuthedUser } from '../actions/authedUser'
import { Redirect } from 'react-router-dom';

class Login extends Component {
  	state = {
      value: undefined
    }

	handleSubmit(event)
	{
      event.preventDefault();
      if (this.state.value !== null)
      {
      	this.props.dispatch(setAuthedUser(this.state.value))
		}
	}

	handleChange(event)
	{
      const val = event.target.value;
      this.setState(() => ({value: val}));
	}
  
  render() {
    if (this.props.authedUser !== null)
    {
      	 const { from } = this.props.location.from === undefined ? { from: { pathname: '/dashboard' } } : this.props.location
     	 return <Redirect to={from} />
    }
    const { users } = this.props;

    return (
      <div>
      	<form onSubmit={this.handleSubmit.bind(this)}>
    	<label>
    		Select user:
    		<select name="selectuser" defaultValue="" value={this.state.value} onChange={this.handleChange.bind(this)}>
    		<option value="" disabled>Select your option</option>
			{Object.keys(users).map( (user) => {
              	return <option key={user} value={user}>{user}</option>
            })}
			</select>
			</label>
          <input type="submit" value="Submit" />
		</form>
		</div>
		);
	}
}

function mapStateToProps ({ authedUser, users }) {
  return {
    authedUser: authedUser,
    users: users
  }
}

export default connect(mapStateToProps)(Login)