import { RECEIVE_USERS, UPDATE_USERS, ADD_QUESTION_TO_USER } from '../actions/users'

export default function user(state = {}, action) {
	switch(action.type) {
      case RECEIVE_USERS:
        return {
        	...state,
          	...action.users
        }
      case UPDATE_USERS:
        return {
          ...state,
          [action.authedUser]: {
          	...state[action.authedUser],
            answers: {
            	...state[action.authedUser].answers,
                [action.qid]: action.answer
            }
          }
        }
      case ADD_QUESTION_TO_USER:
        return {
          	...state,
        	[action.authedUser]: {
          		...state[action.authedUser],
          		questions: state[action.authedUser].questions.concat([action.id])
        	}
        }
      default:
        return state
    }
}
  