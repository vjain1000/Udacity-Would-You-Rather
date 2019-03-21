import React, { Component } from 'react'
import { connect } from 'react-redux'

class Error extends Component {
  
 render() {      
   return (
     <div className="paragraph">
        <h3 className='dashboard-list'>
 
			<span className="card-text">
      		<p>404 Error Page Does Not Exist</p>
			</span>
        </h3>
     </div>
     )
 }
}

function mapStateToProps ({ authedUser}) {
  return {
	authedUser
  }
}

export default connect(mapStateToProps)(Error)