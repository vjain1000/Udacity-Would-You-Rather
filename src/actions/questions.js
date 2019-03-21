import { showLoading, hideLoading } from 'react-redux-loading'
import { _saveQuestionAnswer, _saveQuestion } from '../utils/_DATA.js'
import { updateUsers, addQuestionToUser } from './users'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const UPDATE_QUESTIONS = 'UPDATE_QUESTIONS'

function addQuestion(question) {
  return {
  	type: ADD_QUESTION,
    question
  }
}

function updateQuestions(questions) {
  return {
  	type: UPDATE_QUESTIONS,
    ...questions
  }
}

export function handleAnswerQuestion({qid, answer}) {
  	console.log('handleAnswerQuestion', qid, answer)
	return (dispatch, getState) => {
      const { authedUser } = getState()
      
      dispatch(showLoading())
      
      console.log('saveQuestionAnswer', qid, answer)
      return _saveQuestionAnswer({
     	authedUser, qid, answer
      })
      	.then((res, rej) => {
        	console.log('saveQuestionAnswer Promise', res, res)
        	dispatch(updateQuestions({authedUser, qid, answer}))
        	dispatch(updateUsers({authedUser, qid, answer}))
    	  })
      	.then(() => dispatch(hideLoading()))
    }
}

export function handleAddQuestion(question) {
	return (dispatch, getState) => {
      const { authedUser } = getState()
      const { optionOneText, optionTwoText } = question;
      
      dispatch(showLoading())
      
      return _saveQuestion({optionOneText, optionTwoText, author: authedUser})
      	.then((formattedQuestion) => {
        	dispatch(addQuestion(formattedQuestion))
        	dispatch(addQuestionToUser({id: formattedQuestion.id, authedUser: authedUser}))
      })
      	.then(() => dispatch(hideLoading()))
    }
}

export function receiveQuestions (questions) {
	return {
      type: RECEIVE_QUESTIONS,
      questions,
    }
}