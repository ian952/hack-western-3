import React from 'react';
import '../stylesheets/App.css';
import cx from 'classnames';
const Title = React.createClass({
  render() {
    return (
      <div className={cx('window-size', 'clearfix')}>
        <div className='container'>
          <h1 className='header'>
          	Choose Chews
          </h1>
            <div style={{ margin: '300 0 0 0'}}>
              <div className='row'>
                <div className='col-md-2 col-md-offset-4 col-sm-2 col-sm-offset-4'>
       				   <button className={cx('btn','btn-lg', 'btn-brown')}> 
       					    Host 
       				   </button>
                </div>
              </div>
              <div className='row'>
                <div className='col-md-2 col-md-offset-4 col-sm-2 col-sm-offset-4'>
       				   <button className={cx('btn', 'btn-lg', 'btn-grey')}> 
                      Join 
       				   </button>
                </div>
              </div>
            </div>
        </div>
      </div>
    );
  }
});

export default Title;
