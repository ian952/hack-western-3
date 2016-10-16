import React from 'react';
import '../stylesheets/App.css';
import cx from 'classnames';      
import * as userActions from '../actions/UserActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'


class HomeView extends React.Component {
	constructor(props) {
    super(props);
    this.state = {};
  }
  
  makeRoom = () => {
  	const userID = this.props.userStore.getIn(['user', 'id']);
  	const data = {
  		userId: userID
  	};
  	console.log(userID);
  	this.props.socket.emit('create', data, (roomID) => {
  		this.props.actions.makeLead();
  		this.props.actions.joinRoom(roomID);
  	});
  }

  render() {
  	return(
	  	<div className='potato'>
		  	<div className='container'>
		    	<div className={cx('window-size', 'clearfix')}>
		        <h1 className='header' style={{ margin: '80 0 0 0'}}>
		        	Choose Chews
		        </h1>
		        <div className='infotext row' style={{ margin: '40 0 0 0'}}>
		          <p1> 
		            Can't agree on where to eat? 
		          </p1>
		        </div> 
		        <div className='infotext row'>
		          <p2>
		            Join a friend's group or create your own, and get choosing.
		          </p2>
		        </div>
	          <div style={{ margin: '25 50 50 60'}}>
	            <div className='row'>
	              <div className='col-md-3 col-md-offset-4 col-sm-2 col-sm-offset-4'>
	     				   <button className={cx('roombtn','btn btn-lg', 'btn-brown')}
	     				   				 onClick={this.makeRoom}>
	     					    Host 
	     				   </button>
	              </div>
	            </div>
	            <div className='row'>
	              <div className='col-md-3 col-md-offset-4 col-sm-2 col-sm-offset-4'>
	     				   <button className={cx('roombtn', 'btn btn-lg', 'btn-grey')}> 
	                    Join 
	     				   </button>
	              </div>
	            </div>
	          </div>
	        </div>
	      </div>
	      <div className='footer'>
	        Built by Ian Hu, Alan Li, and William Lo at HackWestern3 
	      </div>
	    </div>
	  );
  }
}

export default HomeView;
