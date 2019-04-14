import React, { Component } from 'react';

import Header from './header';
import Footer from './footer';
import MainContent from './main-content';

import userService from '../../services/user.service';

export class Main extends Component {

  componentWillMount() {
    if (!userService.id) {
      const userDataStr = localStorage.getItem('userData');
      const userData = JSON.parse(userDataStr);

      userService.setData(userData);
    }
  }

  render() {
    return (
      <div>
        <Header />
        
        <div id="content" className="p-5">
          <MainContent />
        </div>

        <Footer />
      </div>
    )
  }
}

export default Main;
