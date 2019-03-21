import React, { Component } from 'react'
import { connect } from 'react-redux'
import Card from './Card'
import { Redirect } from 'react-router-dom'

class Leaderboard extends Component {
  
 render() {
   if (this.props.authedUser === null)
	{
      return <Redirect to={{pathname: '/',
                           from: this.props.location}}/>
    }
      
   return (
     <div>
     	<h3 className='center'>Your Leaderboard</h3>
     {this.props.users.map( (user) => {
    	return <Card userId={user} key={user} /> 
   		})}
     </div>
     )
 }
}

function mapStateToProps ({ authedUser, users }) {
  return {
    authedUser: authedUser,
    users: Object.keys(users).sort((a,b) => 
        -((Object.keys(users[a].answers).length + users[a].questions.length) - 
        (Object.keys(users[b].answers).length + users[b].questions.length)) 
      	)
  }
}

export default connect(mapStateToProps)(Leaderboard)