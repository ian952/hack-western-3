import React from 'react';
import '../stylesheets/App.css';
import cx from 'classnames';      
import * as userActions from '../actions/UserActions';
import { ModalContainer, ModalDialog } from 'react-modal-dialog';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux'


class DistanceView extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
    	isShowingModal: false
    };
  }

    render() {
  	return(

<div className='container'> 
	<h1 style={{ margin:'40 0 0 0'}}>
		Distance
	</h1>
</div>
);
}
} 

