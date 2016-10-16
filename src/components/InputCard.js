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
    		if (this.props.questionStore.get('qnumber') < 12) {
    			  this.props.actions.startVote(nextQuestion);
    		}
    	}
    	this.props.actions.finishedQuestion();
    });
  }

	render() {
		return (
			<div className='container card' onClick={this.handleClick}>
				<div className='col-md-5'>
					<h3>{this.props.name}</h3>
				</div>
				<div className='col-md-3'>
					<img src={this.props.rating} />
				</div>
				<div className='row'>
					<div className='col-md-6'>
						<img src={this.props.image} />
					</div>
				</div>
				<ul className='list-group'>
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