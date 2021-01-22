import React, { Component } from 'react';
import { withTheme } from '../context/AppContext';
import { Redirect } from 'react-router';
import Admin from '../pages/Admin';
import Editor from './Editor';

class Craetor extends Component {
  

  render() {
    const { context } = this.props;
    const { auth } = context;
    if (context && auth) {
      if (process.env.REACT_APP_ADMIN_ID === auth.email){
        return <Admin />
      }else {
        return (
          <Editor />
        );
      }
    } else {
      return <Redirect to='/' />
    }
  }
}

export default withTheme(Craetor);