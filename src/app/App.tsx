import React from 'react';
import BookmarkForm from '../components/BookmarkForm';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import './index.scss';
import Header from '../components/Header';

const App: React.FC = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <Header/>
        <Switch>
          <Route path='/new'>
            <BookmarkForm/>
          </Route>
          <Route path='/list'>
            <div>List</div>
          </Route>
          <Route exact path='/'>
            <div>Home</div>
          </Route>
          <Route path='/help'>
            <div>Help</div>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
