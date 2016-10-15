import React from 'react';
import '../stylesheets/App.css';
import FormView from './Form';
import io from 'socket.io-client';
import { ModalContainer, ModalDialog } from 'react-modal-dialog';
import * as userActions from '../actions/UserActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
const socket = io('http://localhost:3000');

class Title extends React.Component {
  state = {
    isShowingModal: true
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
  	const name = {
  		name: this.refs.nameForm.value
  	};
  	socket.emit('newuser', name);
    this.props.actions.setName(this.refs.nameForm.value);
    this.handleClose();
  }

  render() {
    return (
      <div>
        <h1 className='header'>Choose Chews</h1>
        <div className='row'>
        	<FormView />
        </div>
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
      </div>
    );
  }
};

function mapStateToProps (state) {
	return {
    name: state.UserStore.get('name')
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
