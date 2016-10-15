import React from 'react';
import io from 'socket.io-client';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class RoomView extends React.Component {
	componentDidMount() {
    // this.props.socket.on('person_list', );
  }

	render() {
		return (
		{
			this.state.userList.map((name) =>
				return (
					<h3> Name </h3>
				);
			)
		});
	}
}

function mapStateToProps(state) {
  return {
      userList: state.get('userList');
  }
}

export default connect(mapStateToProps)(RoomView)