import React from 'react';
import { Line } from 'rc-progress';
import '../stylesheets/InputButton.scss';
import cx from 'classnames';

class InputButton extends React.Component {

	render() {
		return (
			<div className={cx('row', 'button')}>
				<div className='col-md-2'>
					<button className='btn btn-brown inputBtn'>
						{this.props.name}
					</button>
				</div>
				<div className='col-md-10'>
				  <Line percent="10" strokeWidth="2" trailWidth="2" strokeColor="#b02336" />
				</div>
			</div>
		);
	}
}

InputButton.propTypes = {
	name: React.PropTypes.string.isRequired
};

export default InputButton;