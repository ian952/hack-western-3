import React from 'react';
import '../stylesheets/InputCard.scss';
import cx from 'classnames';

class InputCard extends React.Component {

	handleClick = () => {
		console.log('clicked', this.props.answer.toJS())
		const data = {
			group_ID: this.props.pageStore.get('roomID'),
			person_ID: this.props.userStore.getIn(['user', 'id']),
			answer: this.props.answer.toJS()
		}
    this.props.socket.emit('answer', data, (nextQuestion) => {
    	if (nextQuestion) {
    		//last one to emit response
    		if (this.props.questionStore.get('qnumber') < 11) {
    			this.props.actions.startVote(nextQuestion);
    		} else {
    			this.props.actions.showResult(nextQuestion.answers[0]);
    		}
    	}
    	this.props.actions.finishedQuestion();
    });
  }

	render() {
		return (
			<div className='container card col-md-6' onClick={this.handleClick}>
				<div className='col-md-12'>
					<h3 className = 'title'>{this.props.name}</h3>
				</div>
				<div className='col-md-6'>
					<div className='col-md-12'>
						<img src={this.props.image} />
					</div>
					<div className='col-md-12'>
						<img src={this.props.rating} />
					</div>
				</div>
				<ul className='list-group col-md-6'>
					{this.props.categories.map((categoryName, i) => 
						<li key={categoryName + i}
								className='list-group-item'>
								{categoryName}
						</li>
					)}
				</ul>
			</div>
		);
	}
}

export default InputCard;