import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared'
import Dashboard from './Dashboard'
import Login from './Login'
import './App.css';
import LoadingBar from 'react-redux-loading'
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import Nav from './Nav'
import NewQuestion from './NewQuestion'
import Leaderboard from './Leaderboard'
import QuestionPage from './QuestionPage'
import Error from './Error'

class App extends Component {
  componentDidMount() {
   	this.props.dispatch(handleInitialData()) 
  }
  
  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div className='container'>
            <Nav />
            <div>
      			<Switch>
      			  <Route exact path='/' component={Login} />
                  <Route path='/dashboard' component={Dashboard} />
                  <Route path='/questions/:question_id' component={QuestionPage} />
                  <Route path='/add' component={NewQuestion} />
				  <Route path='/leaderboard' component={Leaderboard} />
				  <Route component={Error} />
				</Switch>
                </div>
          </div>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps ({ authedUser }) {
  return {
    loading: authedUser === null
  }
}

export default connect(mapStateToProps)(App)