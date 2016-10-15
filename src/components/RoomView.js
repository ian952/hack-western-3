import React from 'react';
import io from 'socket.io-client';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class RoomView extends React.Component {
	componentDidMount() {
    this.props.socket.on('person_list', (personList) => {
    	console.log(personList);
    });
  }

	render() {
		const roomNum = this.props.pageStore.get('roomID');
		return (
			<div className='container'>
				<h3> Tell your friends to join room {roomNum}! </h3>

			</div>
		);
	}
}


export default RoomView;