import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleAddQuestion } from '../actions/questions'
import { Redirect } from 'react-router-dom'
import {withRouter} from 'react-router';

class NewQuestion extends Component {
	state = {
    	optionOneText: '',
      	optionTwoText: ''
    }
	
	handleOption1Change = (e) => {
    	const text = e.target.value
        
        this.setState((state) => ({
        	optionOneText: text,
          	optionTwoText: this.state.optionTwoText
        }))
    }

	handleOption2Change = (e) => {
    	const text = e.target.value
        
        this.setState((state) => ({
        	optionOneText: this.state.optionOneText,
          	optionTwoText: text
        }))
    }
	
	handleSubmit = (e) => {
    	e.preventDefault()
      
        const { dispatch } = this.props
        
        dispatch(handleAddQuestion(this.state))
      	.then( (res, rej) => {
        	console.log('New Question', this.state.optionOneText, this.state.optionTwoText)
    		this.props.history.push(`/dashboard`)
        })
    }

	render() {
      if (this.props.authedUser === null)
	  {
      	return <Redirect to='/' />
       }
  		const { optionOneText, optionTwoText } = this.state
		
		return (this.props.authedUser &&
		<div>
		<h3 className='center'>Compose new Question</h3>
		<form onSubmit={this.handleSubmit.bind(this)}>
      			<div>
				<textarea
					placeholder="Option 1"
					value={optionOneText}
					onChange={this.handleOption1Change.bind(this)}
					className='textarea'
					maxLength={280}
				/>
				</div>
				<div>
                <textarea
					placeholder="Option 2"
					value={optionTwoText}
					onChange={this.handleOption2Change.bind(this)}
					className='textarea'
					maxLength={280}
				/>
				</div>
				<button
					className='btn'
					type='submit'
					disabled={optionOneText === '' || optionTwoText === ''}>
						Submit
				</button>
			</form>
		</div>
          )
	}
}

function mapStateToProps ({ authedUser }) {
  return {
    authedUser: authedUser
  }
}

export default withRouter(connect(mapStateToProps)(NewQuestion))