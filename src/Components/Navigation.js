import React from 'react'
import Home from'./Pages/Home';
import Chart from './Pages/Chart';
import Report from './Pages/Report';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link} from 'react-router-dom';

export default function Navigation() {
  console.log('1')
  return (
      <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/charts">График</Link>
            </li>
            <li>
              <Link to="/reports">Отчёт</Link>
            </li>
          </ul>
        </nav>
  
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/charts">
            <Chart />
          </Route>
          <Route path="/reports">
            <Report />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
    )
  
}
