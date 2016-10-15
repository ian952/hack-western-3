import React from 'react';
import '../stylesheets/App.css';
import cx from 'classnames';      
import * as userActions from '../actions/UserActions';
import { ModalContainer, ModalDialog } from 'react-modal-dialog';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'

class HomeView extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
    	isShowingModal: false
    };
  }

  handleClick = () => {
  	this.setState({
  		isShowingModal: true
  	});
  }

  handleClose = () => {
  	this.setState({
  		isShowingModal: false
  	})
  }
  
  makeRoom = () => {
  	const userID = this.props.userStore.getIn(['user', 'id']);
  	const data = {
  		person_ID: userID
  	};
  	this.props.socket.emit('create', data, (roomID) => {
  		this.props.actions.makeLead();
  		this.props.actions.joinRoom(roomID);
  	});
  }

  joinRoom = () => {
  	const userID = this.props.userStore.getIn(['user', 'id']);
  	const roomID = this.refs.roomForm.value;
  	const data = {
  		person_ID: userID,
  		group_ID: roomID
  	};
  	this.props.socket.emit('join', data, () => {
  		console.log('im out');
  		this.props.actions.joinRoom(roomID);
  	});
  }

  render() {
  	return(
	  	<div>
	  	  {
	      	this.state.isShowingModal &&
	        <ModalContainer onClose={this.handleClose}>
	          <ModalDialog onClose={this.handleClose}>
	            <h3>Enter your room ID:</h3>
	            <input ref='roomForm'/>
	            <button className='btn btn-danger' onClick={this.joinRoom}> Enter </button>
	          </ModalDialog>
	        </ModalContainer>
      	}
		  	<div className='container'>
		    	<div className={cx('window-size', 'clearfix')}>
		        <h1 className='header'>
		        	Choose Chews
		        </h1>
		        <div className='infotext row'>
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
	     				   <button className={cx('roombtn', 'btn btn-lg', 'btn-grey')}
	     				   				 onClick={this.handleClick}> 
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
