import React from 'react';
import '../stylesheets/App.css';
import '../stylesheets/push-bootstrap-button-pack-master/assets/css/buttons.css';
import cx from 'classnames';
const Title = React.createClass({
  render() {
    return (
      <div className='container' style={{ background: '#343d46'}}>
        <h1 className='header' style={{ color: 'white'}}>
        	Choose Chews
        </h1>
      	<div className='center-block btn-group-vertical row'>
 				<button className='btn btn-lg btn-primary raised round' style={{ margin: '30 0 0 0'}}> 
 					Host 
 				</button>
 				<button className='btn btn-lg btn-primary raised round' style={{margin: '20 0 0 0'}}> 
 					Join 
 				</button>
 		</div>
      </div>
    );
  }
});

export default Title;
