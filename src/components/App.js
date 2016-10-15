import React from 'react';
import '../stylesheets/App.css';
import cx from 'classnames';      
import FormView from './Form';
import io from 'socket.io-client';
import { ModalContainer, ModalDialog } from 'react-modal-dialog';
import * as userActions from '../actions/UserActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
const socket = io('http://localhost:3000');

class Title extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    	isShowingModal: true
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

  submitName = () => {
  	const data = {
  		name: this.refs.nameForm.value
  	};
  	socket.emit('newuser', data, (userID) => {
  		this.props.actions.setName(data.name, userID);
  	});
    this.handleClose();
  }

  makeRoom = () => {
  	this.props.actions.makeRoom();
  }

  render() {
    return (
      <div>
      	{
	      	this.state.isShowingModal &&
	        <ModalContainer onClose={this.handleClose}>
	          <ModalDialog onClose={this.handleClose}>
	            <h3>Enter your name:</h3>
	            <input ref='nameForm'/>
	            <button className='btn btn-danger' onClick={this.submitName}> Enter </button>
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
  };
};

function mapStateToProps (state) {
	return {
    user: state.UserStore.get('user')
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(userActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Title)
