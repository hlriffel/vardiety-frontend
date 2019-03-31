import React from 'react';

import Header from './header';
import Footer from './footer';
import MainContent from './main-content';

const Main = () => (
  <div>
    <Header />
    
    <div id="content" className="p-5">
      <MainContent />
    </div>

    <Footer />
  </div>
);

export default Main;
