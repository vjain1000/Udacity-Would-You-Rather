import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAnswerQuestion } from '../actions/questions'
import '../index.css'
import './App.css'
import { Redirect } from 'react-router-dom'
import { setAuthedUser } from '../actions/authedUser'

class Question extends Component
{
  	state = {
     	selectedOption: this.props.answer,
        showStats: this.props.showStats
    }

	handleOptionChange(event)
	{
  		const option = event.target.value;
 		this.setState( (prevState) => ({...prevState, selectedOption: option}) );
	}

	handleSubmit(event)
	{
      event.preventDefault();

 		const { dispatch } = this.props
        
        dispatch(handleAnswerQuestion({qid: this.props.question.id, answer: this.state.selectedOption}))
		.then((res, rej) =>
            {
            	console.log('New Question', this.state)
				this.setState( (prevState) => ({...prevState, showStats: true}) );
        	})
	}
	render()
  	{
      const { question, avatarUrl, authorName } = this.props
	  if (question === undefined)
      {
        	this.props.dispatch(setAuthedUser(null));
     	 	return <Redirect to={{pathname: '/',
                           from: '/Error'}}/>
   	  }
	  const oneVotes = Object.keys(this.props.question.optionOne.votes).length
	  const twoVotes = Object.keys(this.props.question.optionTwo.votes).length
	  const totalVotes = oneVotes + twoVotes;
      
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
            <form onSubmit={this.handleSubmit.bind(this)}>
				<h3 className="radio">Would Your Rather...</h3>
                <div className="radio">
                  <label className="label">
                    <input type="radio" value="optionOne" 
                        checked={this.state.selectedOption === 'optionOne'} 
                        onChange={this.handleOptionChange.bind(this)}
						disabled={this.state.showStats} />
                    {question.optionOne.text} &nbsp;
					{this.state.showStats && 
                                                         <span className="votes">&nbsp;{Object.keys(this.props.question.optionOne.votes).length}&nbsp; Votes
														 &nbsp; {Math.round(oneVotes/totalVotes*100)}% </span> }
                  </label>
                </div>
                <div className="radio">
                  <label className="label">
                    <input type="radio" value="optionTwo" 
                        checked={this.state.selectedOption === 'optionTwo'}
                        onChange={this.handleOptionChange.bind(this)}
						disabled={this.state.showStats} />
                    {question.optionTwo.text} &nbsp; 
				{this.state.showStats && 
                                                         <span className="votes"> &nbsp; {Object.keys(this.props.question.optionTwo.votes).length} &nbsp;Votes
														 &nbsp; {Math.round(twoVotes/totalVotes*100)}% </span> 
														 }
                  					</label>
				</div>
				{!this.state.showStats && <button
					className='btn'
					type='submit'
					disabled={this.state.selectedOption === '' || this.state.selectedOption === ''}>
						Submit
				</button>
				}
              </form>
			</div>
			</div>
        </div>
        )
  	}
}

function mapStateToProps ({authedUser, users, questions }, { id } ) {  
  
  const question = questions[id]
  const user = question === undefined ? undefined : users[question.author]
  const avatarUrl = user === undefined ? undefined : user.avatarURL
  let answer = undefined
  
  if (question !== undefined && authedUser !== undefined && users[authedUser] !== undefined)
  {
   	 answer = users[authedUser].answers[id]
  }
  
  return {
    authedUser,
    answer: answer,
    avatarUrl: avatarUrl,
    question: question,
    authorName: user === undefined ? undefined : user.name
  }
}

export default connect(mapStateToProps)(Question)