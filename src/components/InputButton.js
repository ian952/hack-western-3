import React from 'react';
import { Line } from 'rc-progress';
import '../stylesheets/InputButton.scss';
import cx from 'classnames';

class InputButton extends React.Component {

	render() {
		return (
			<div className={cx('row', 'button')}>
				<div className='col-md-1'>
					<button className='btn btn-danger'>
						{this.props.name}
					</button>
				</div>
				<div className='col-md-11'>
				  <Line percent="10" strokeWidth="2" trailWidth="2" strokeColor="#D80000" />
				</div>
			</div>
		);
	}
}

InputButton.propTypes = {
	name: React.PropTypes.string.isRequired
};

export default InputButton;