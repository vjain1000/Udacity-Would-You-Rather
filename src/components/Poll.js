import React, { Component } from 'react'
import { connect } from 'react-redux'
import '../index.css'
import './App.css'
import {withRouter} from 'react-router';

class Poll extends Component
{
	handleClick(event)
	{
    	event.preventDefault()
    	this.props.history.push(`/questions/${this.props.id}`)
    }

	render()
  	{
      const { question, avatarUrl, authorName } = this.props
      const substringLength = question.optionOne.text.length < 10 ? question.optionOne.text.length : 10;
      
      return(
        <div>
			<div className='paragraph-left'><b>{authorName} asks:</b></div>
			<div className='row'>
			<div className='column1'>
        	<img
        		className="avatar"
        		src={avatarUrl}
  				alt='Great'
			/>
			</div>
			<div className='column2'>
				<h3 className="label">Would You Rather...</h3>
                  <label className="label">
					{"..." + question.optionOne.text.substring(0, substringLength) + "..."}
                  </label>
				</div>
				<button
					className='btn'
					onClick={this.handleClick.bind(this)}>View Poll</button>
			</div>
        </div>
        )
  	}
}

function mapStateToProps ({authedUser, users, questions }, { id } ) {  
  const question = questions[id]
  const user = users[question.author]
  const avatarUrl = user.avatarURL
  
  return {
    authedUser,
    avatarUrl: avatarUrl,
    question: question,
    authorName: user.name
  }
}

export default withRouter(connect(mapStateToProps)(Poll))