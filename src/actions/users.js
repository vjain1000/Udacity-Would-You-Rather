export const RECEIVE_USERS = 'RECEIVE_USERS'
export const UPDATE_USERS = 'UPDATE_USERS'
export const ADD_QUESTION_TO_USER = 'ADD_QUESTION_TO_USER'

export function receiveUsers (users) {
	return {
      type: RECEIVE_USERS,
      users,
    }
}

export function updateUsers(users) {
 	return {
     type: UPDATE_USERS,
     ...users
    }
}

export function addQuestionToUser(user) {
	return { type: ADD_QUESTION_TO_USER,
    ...user
           }
}