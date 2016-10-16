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
import DistanceView from './DistanceView';
import QuestionView from './QuestionView';
import FinalView from './FinalView';
import * as pages from '../constants/PageTypes';
const socket = io('http://choosechews.herokuapp.com');

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
        return <HomeView 
                  socket={socket} 
                  userStore={this.props.userStore}
                  actions={this.props.actions} />

      case pages.ROOM:
        return <RoomView 
                  socket={socket}
                  pageStore={this.props.pageStore}
                  userStore={this.props.userStore}
                  actions={this.props.actions} />

      case pages.LOC:
        return <DistanceView 
                  socket={socket}
                  pageStore={this.props.pageStore}
                  userStore={this.props.userStore}
                  actions={this.props.actions} />

      case pages.VOTE:
        return <QuestionView 
                  socket={socket}
                  pageStore={this.props.pageStore}
                  userStore={this.props.userStore}
                  questionStore={this.props.questionStore}
                  actions={this.props.actions}
                />


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
              <div className='popupsize' style={{ zoom: '175%'}}>
                <div className='row'>
  	             <h3 className='rubik docenter'>Enter Your Name</h3>
                </div>
                <div className='row docenter'>
  	             <input ref='nameForm'/>
                </div>
                <div className='row docenter' style={{ margin: '15 0 0 0'}}>
  	             <button className='btn btn-danger rubik' onClick={this.submitName}> Enter </button>
	              </div>
              </div>
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
    pageStore: state.PageStore,
    questionStore: state.QuestionStore
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
