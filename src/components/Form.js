import React from 'react';
import InputButton from './InputButton';
import io from 'socket.io-client'
let socket = io(`http://localhost:8000`)

class FormView extends React.Component {


	render() {
		return (
			<div className='container'>
				<h2>Choose Distance</h2>
				<InputButton name='<2km' />
				<InputButton name='<5km' />
				<InputButton name='<20km' />
				<InputButton name='<40km' />
			</div>
		);
	}
}

export default FormView;