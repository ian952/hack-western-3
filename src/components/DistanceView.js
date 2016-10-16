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
      	<h1 className= 'smallheader' style={{ margin:'60 0 0 20'}}>
      		Distance
      	</h1>
        <form>
          <input type="text" />
        </form>
      </div>

    );
  }
} 

export default DistanceView;
