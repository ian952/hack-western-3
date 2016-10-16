import React from 'react';
import { Line } from 'rc-progress';
import '../stylesheets/InputButton.scss';
import cx from 'classnames';

class InputButton extends React.Component {

	handleClick = () => {
		const data = {
			group_ID: this.props.pageStore.get('roomID'),
			person_ID: this.props.userStore.getIn(['user', 'id']),
			answer: this.props.name
		}
    this.props.socket.emit('answer', data, (nextQuestion) => {
    	if (nextQuestion) {
    		//last one to emit response
    		this.props.actions.startVote(nextQuestion);
    	}
    	this.props.actions.finishedQuestion();
    });
  }

	render() {
		const size = this.props.userStore.get('userList').size - 1;
		const numerator = this.props.questionStore.getIn(['currAnswers', this.props.index]);
		const fillPercent = (size > 0 && numerator) ? (numerator/size*100).toString() : 0 ;
		console.log(fillPercent);
		return (
			<div className={cx('row', 'button')}>
				<div className='col-md-2'>
					<button className='btn btn-brown inputBtn' onClick={this.handleClick}>
						{this.props.name}
					</button>
				</div>
				<div className='col-md-10'>
				  <Line percent={fillPercent} strokeWidth="2" trailWidth="2" strokeColor="#b02336" />
				</div>
			</div>
		);
	}
}

InputButton.propTypes = {
	name: React.PropTypes.string.isRequired
};

export default InputButton;