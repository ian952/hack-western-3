import React from 'react';
import io from 'socket.io-client';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class JoinRoom extends React.Component {
	componentDidMount() {
    const { socket, user, dispatch } = this.props;
    socket.emit('chat mounted', user);
    socket.on('user_join', (user) =>
      actions.userJoin(user.name)
    );
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
export default connect(mapStateToProps)(JoinRoom)