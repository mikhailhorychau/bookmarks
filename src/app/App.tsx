import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import './index.scss';
import Header from '../components/Header';
import NewBookmark from '../pages/NewBookmark';
import Bookmarks from '../pages/Bookmarks';
import Settings from '../pages/Settings';

const App: React.FC = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <Header/>
        <Switch>
          <Route path='/new'>
            <NewBookmark/>
          </Route>
          <Route path='/list'>
            <Bookmarks/>
          </Route>
          <Route exact path='/'>
            <div>Home</div>
          </Route>
          <Route path='/settings'>
            <Settings/>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
