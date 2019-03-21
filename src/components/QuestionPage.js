import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'
import { Redirect } from 'react-router-dom'
import { setAuthedUser } from '../actions/authedUser'

class QuestionPage extends Component {  
  render() {
    const { id } = this.props
    if (this.props.authedUser === null)
	{
      return <Redirect to={{pathname: '/',
                           from: this.props.location}}/>
    }
    
    if (id === null)
    {
      	this.props.dispatch(setAuthedUser(null));
     	 	return <Redirect to={{pathname: '/',
                           from: '/Error'}}/>
    }
    return (
      <div>
        <Question id={id} showStats={false} />
      </div>
    )
  }
}

function mapStateToProps ({ authedUser, questions, users }, props) {
  const { question_id } = props.match.params

  return {
    authedUser,
    id: question_id
  }
}

export default connect(mapStateToProps)(QuestionPage)