import React from 'react';
import '../stylesheets/App.css';
import cx from 'classnames';      
import * as userActions from '../actions/UserActions';
import { ModalContainer, ModalDialog } from 'react-modal-dialog';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'


class FinalView extends React.Component {
	constructor(props) {
    	super(props);
    	this.state = {
    		isShowingModal: false
    	};
	}
  	render() {
  		return(
  			<div> 
  				hello
  			</div>
  		);
  	}
	
}


export default FinalView;