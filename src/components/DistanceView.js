import React from 'react';
import '../stylesheets/DistanceView.scss';
import cx from 'classnames';      

class DistanceView extends React.Component {
	constructor(props) {
    super(props);
    this.state = {
    	location: '',
      radius: 40
    };
  }

  handleInput = (e) => {
    this.setState({
      location: e.target.value
    });
  }

  setDist = (value, e) => {
    this.setState({
      radius: value
    });
  }

  startQuestions = (e) => {
    const data = {
      group_ID: this.props.pageStore.get('roomID'),
      location: this.state.location,
      radius: this.state.radius
    }
    this.props.socket.emit('start', data, (question) => {
      this.props.actions.startVote(question);
    });
  }

  render() {
  	return(
      <div className='container'>
      	<h1 className= 'smallheader'>
      		Distance
      	</h1>
        <div className='content'>
          <div className='row'>
            <div className='col-md-6'>
              <h3>Enter your location </h3>
              <input type='text' className='cityInput' onBlur={this.handleInput} />
            </div>
            <div className='col-md-6 btnCont'>
              <button className='btn btn-success locationBtn'> Use Current Location </button>
            </div> 
          </div>
          <div className='row'>
            <h3>Choose distance radius </h3>
            <div className='row'>
              <div className='col-sm-12 col-md-3 btncont'>
                <button className='btn btn-danger distBtn' 
                        onClick={this.setDist.bind(this, 2)}> 
                        Within 2km 
                </button>
              </div>
               <div className='col-sm-12 col-md-3 btncont'>
                <button className='btn btn-danger distBtn'
                        onClick={this.setDist.bind(this, 5)}> 
                        Within 5km
                </button>
              </div>
               <div className='col-sm-12 col-md-3 btncont'>
                <button className='btn btn-danger distBtn'
                        onClick={this.setDist.bind(this, 20)}> 
                        Within 20km 
                </button>
              </div>
               <div className='col-sm-12 col-md-3 btncont'>
                <button className='btn btn-danger distBtn'
                        onClick={this.setDist.bind(this, 40)}> 
                        Within 40km 
                </button>
              </div>
            </div>
          </div>
          <div className='row startBtnCont'>
            <button className='btn btn-primary startBtn'
                    onClick={this.startQuestions}>
              Start Questions
            </button>
          </div>
        </div>
      </div>
    );
  }
} 

export default DistanceView;
