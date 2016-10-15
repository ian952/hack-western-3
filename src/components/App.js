import React from 'react';
import '../stylesheets/App.css';
import FormView from './Form';
import io from 'socket.io-client';
import { ModalContainer, ModalDialog } from 'react-modal-dialog';
import * as userActions from '../actions/UserActions';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
//const socket = io('http://localhost');

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
  	console.log(this.refs.nameForm.value)
  	this.props.actions.setName(this.refs.nameForm.value);
  	this.setState({
  		isShowingModal: false
  	})
  }

  render() {
    return (
      <div>
        <h1 className='header'>Choose Chews</h1>
        <FormView />
        {
	      	this.state.isShowingModal &&
	        <ModalContainer onClose={this.handleClose}>
	          <ModalDialog onClose={this.handleClose}>
	            <h3>Enter your name:</h3>
	            <input ref='nameForm'/>
	            <button className='btn btn-danger' onClick={this.handleClose}> Enter </button>
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
