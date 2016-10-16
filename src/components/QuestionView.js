import React from 'react';
import '../stylesheets/QuestionView.scss';
import cx from 'classnames';    
import InputButton from './InputButton';

class QuestionView extends React.Component {
	
	displayQuestion() {
		return <h3>{this.props.questionStore.get('currQuestion')}</h3>
	}

	displayAnswers() {
		return this.props.questionStore.get('answers').map((answer) => {
			return (
					<InputButton 
						name={answer}
						userStore={this.props.userStore}
						pageStore={this.props.pageStore} />
			);
		});
	}

	render() {
		return (
			<div className='container'>
      	<h1 className= 'smallheader'>
      	  Questions:
      	</h1>
      	<div className='content'>
	      	<div className='row'>
	      		{this.displayQuestion()}
	      	</div>
	      	<div className='row'>
	      		{this.displayAnswers()}
	      	</div>
	      </div>
      </div>
		);
	}
}

export default QuestionView;