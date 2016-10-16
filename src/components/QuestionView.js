import React from 'react';
import '../stylesheets/QuestionView.scss';
import cx from 'classnames';    
import InputButton from './InputButton';
import InputCard from './InputCard';

class QuestionView extends React.Component {

	componentDidMount() {
		this.props.socket.on('question', (question) => {
      console.log(question);
      this.props.actions.startVote(question);
    });
    this.props.socket.on('submittedanswers', (answerList) => {
    	this.props.actions.updateVotes(answerList);
    });
	}

	displayQuestion() {
		return <h3>{this.props.questionStore.get('currQuestion')}</h3>
	}

	displayAnswers() {
		return this.props.questionStore.get('answers').map((answer, i) => {
			if (this.props.questionStore.get('qnumber') < 5) {
				return (
						<InputButton
							key={answer + i}
							index={i}
							name={answer}
							userStore={this.props.userStore}
							pageStore={this.props.pageStore}
							questionStore={this.props.questionStore}
							socket={this.props.socket}
							actions={this.props.actions} />
				);
			} else {
				return (
					<InputCard
						key={answer.get('name') + i}
						answer={answer}
						index={i}
						name={answer.get('name')}
						userStore={this.props.userStore}
						pageStore={this.props.pageStore}
						questionStore={this.props.questionStore}
						socket={this.props.socket}
						actions={this.props.actions}
						rating={answer.get('rating_img_url')}
						image={answer.get('img_url')}
						categories={answer.get('categories')} />
				)
			}
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