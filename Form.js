import React from 'react';

import io from 'socket.io-client'
let socket = io(`http://localhost:8000`)

class FormView extends React.Component {


	render() {
		return (
			<DistanceSlider />
		);
	}
}