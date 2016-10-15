import React from 'react';
import '../stylesheets/App.css';
import FormView from './Form';

const Title = React.createClass({
  render() {
    return (
      <div>
        <h1 className='header'>Choose Chews</h1>
        <FormView />
      </div>
    );
  }
});

export default Title;
