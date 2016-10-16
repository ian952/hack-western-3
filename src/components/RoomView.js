import React from 'react';
import io from 'socket.io-client';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import '../stylesheets/RoomView.scss';

class RoomView extends React.Component {
	
	componentDidMount() {
    this.props.socket.on('person_list', (personList) => {
    	this.props.actions.userJoin(personList);
    });
    this.props.socket.on('question', (question) => {
      this.props.actions.startVote(question);
    });
  }

  loadPeople() {
  	return this.props.userStore.get('userList').map((user, i) => {
  		return (
  			<li className='list-group-item'
  					key={user + i}>
  					{user.get('name')}
  			</li>
  		);
  	});
  }

  startQuestions() {
  	this.props.socket.emit('start', () => {
  		this.props.actions.startVote();
  	});
  }

  setLoc = () => {
  	this.props.actions.setLoc();
  }

	render() {
		const roomNum = this.props.pageStore.get('roomID');
		const isHost = this.props.userStore.get('host');
		return (
			<div className='container center'>
				<h2> Tell your friends to join room {roomNum}! </h2>
				<div className='list-group peopleList'>
					{this.loadPeople()}
				</div>
				{isHost && 
					<button className='btn btn-danger btn-large' onClick={this.setLoc}>
						Start!
					</button>
				}
			</div>
		);
	}
}


export default RoomView;