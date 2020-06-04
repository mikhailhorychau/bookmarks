import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import './index.scss';
import Header from '../components/Header';
import NewBookmark from '../pages/NewBookmark';

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
