import React from 'react';
import io from 'socket.io-client';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class RoomView extends React.Component {
	componentDidMount() {
    // this.props.socket.on('person_list', );
  }

	render() {
		const roomNum = this.props.pageStore.get('roomID');
		return (
			<div>
				<h3> You are in room {this.props.pageStore.roomID} </h3>
			</div>
		);
	}
}


export default RoomView;