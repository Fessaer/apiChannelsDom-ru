import React from 'react'
import Home from'./Pages/Home';
import Settings from './Pages/Settings';
import Users from './Pages/Users';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link} from 'react-router-dom';

export default function Navigation() {
  return (
      <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/Settings">График</Link>
            </li>
            <li>
              <Link to="/users">Отчёт</Link>
            </li>
          </ul>
        </nav>
  
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/settings">
            <Settings />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
    )
  
}
