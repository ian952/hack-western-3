import React from 'react';
import '../stylesheets/App.css';
import cx from 'classnames';
import io from 'socket.io-client';
import { ModalContainer, ModalDialog } from 'react-modal-dialog';
import * as userActions from '../actions/UserActions';
import * as pageActions from '../actions/PageActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'
import HomeView from './HomeView';
import RoomView from './RoomView';
import FormView from './Form';
import * as pages from '../constants/PageTypes';
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

  routePage = () => {
    switch(this.props.pageStore.get('currPage')) {

      case pages.HOME:
        return <HomeView socket={socket} userStore={this.props.userStore} actions={this.props.actions}/>

      case pages.ROOM:
        return <RoomView socket={socket}/>

      default:
        return null;
    }

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
        {this.routePage()}
		    </div>
    );
  };
};

function mapStateToProps (state) {
	return {
    userStore: state.UserStore,
    pageStore: state.PageStore
  }
}

function mapDispatchToProps (dispatch) {
  return {
    actions: bindActionCreators(Object.assign({},
      userActions,
      pageActions
    ), dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Title)
