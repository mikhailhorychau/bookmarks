import React from 'react';
import BookmarkForm from '../components/BookmarkForm';

import './index.scss';
import Header from '../components/Header';

const App: React.FC = () => {
  return (
    <div className="app">
      <Header/>
      <BookmarkForm/>
    </div>
  );
}

export default App;
