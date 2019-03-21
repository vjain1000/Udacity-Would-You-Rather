import React, { Component } from 'react'
import { connect } from 'react-redux'
import Question from './Question'
import { Redirect } from 'react-router-dom'
import Poll from './Poll'

class Dashboard extends Component {
  state = {
    selectedOption: 'unanswered'
  }

handleOptionChange(event)
{
  	const option = event.target.value;
 	this.setState( () => ({selectedOption: option}) );
}
  
 render() {
   if (this.props.authedUser === null)
	{
      return <Redirect to='/' />
        
    }
   
   return (
     <div>
     	<h3 className='center'>Your Timeline</h3>
        	<form>
     		<div className='row'>
     		<div className='column'>
        		<div className="radio">
          			<label>
            			<input type="radio" value="unanswered" 
      						checked={this.state.selectedOption === 'unanswered'} 
     						onChange={this.handleOptionChange.bind(this)}/>
            				Unanswered Questions
          			</label>
        		</div>
			</div>
        	<div className='column'>	
				<div className="radio">
          			<label>
            			<input type="radio" value="answered" 
   							checked={this.state.selectedOption === 'answered'}
							onChange={this.handleOptionChange.bind(this)}/>
            				Answered Questions
          			</label>
        		</div>
			</div>
			</div>
      		</form>
			<div className='center'>
        		<ul className='dashboard-list'>
          		{ this.props.questions.map((id) => {
            			if (this.state.selectedOption === 'answered') {
            				return (id in this.props.user.answers && 
            					<li key={id}>
              						<Question id={id} showStats={true} />
            					</li>
							)
						}
						else {
                  			return (!(id in this.props.user.answers) && 
            					<li key={id}>
									<Poll id={id} />
            					</li>
							)
						}
					}
          		)}
        	</ul>
			</div>
		</div>
     )
 }
}

function mapStateToProps ({ authedUser, questions, users }) {
  return {
    questions: Object.keys(questions)
      .sort((a,b) => questions[b].timestamp - questions[a].timestamp),
    authedUser: authedUser,
    user: users[authedUser]
  }
}

export default connect(mapStateToProps)(Dashboard)
