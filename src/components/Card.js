import React, { Component } from 'react'
import { connect } from 'react-redux'

class Card extends Component {
  
 render() {
   return (
     <div className="paragraph">
     	
        <h3 className='dashboard-list'>
     		<img
        		src={this.props.user.avatarURL}
				className="avatar"
				alt="avatar"
			/>
			<span className="card-text">
      			<p>Name: {this.props.user.name}</p>
      			<p>Answers: {this.props.answers}</p>
				<p>Questions: {this.props.questions}</p>
			</span>
        </h3>
     </div>
     )
	}
}

function mapStateToProps ({ authedUser, users }, { userId }) {
  return {
    score: Object.keys(users[userId].answers).length + users[userId].questions.length,
    authedUser: authedUser,
    answers: Object.keys(users[userId].answers).length,
    questions: users[userId].questions.length,
    user: users[userId]
  }
}

export default connect(mapStateToProps)(Card)