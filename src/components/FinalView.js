import React from 'react';
import '../stylesheets/App.css';
import cx from 'classnames';      
import * as userActions from '../actions/UserActions';
import { ModalContainer, ModalDialog } from 'react-modal-dialog';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'

import InputCard from './InputCard';

class FinalView extends React.Component {
	constructor(props) {
    	super(props);
	}
	
  render() {
    const answer = this.props.questionStore.get('answer');
		return(
			<div> 
				<h1> Here is your result </h1>
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
			</div>
		);
	}
	
}


export default FinalView;