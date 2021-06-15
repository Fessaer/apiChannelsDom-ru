import React from 'react'
import Chart from './Pages/Chart';
import Report from './Pages/Report';
import {
  BrowserRouter as Router,
  Switch,
  Route} from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';

  import ResponsiveNavbar from '@opuscapita/react-responsive-navbar';

export default function Navigation() {
  console.log('1')
  return (
    <Router>
      <div className="container-fluid">
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        {/* <Navbar collapseOnSelect expand="sm">
          <Container>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav>
                <Nav.Link href='/'>График</Nav.Link>
                <Nav.Link href='/reports'>Отчёт</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar> */}
        <Nav fill variant="tabs" defaultActiveKey="/reports">
          <Nav.Item>
            <Nav.Link href="/reports">Отчёт</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="/charts">График</Nav.Link>
          </Nav.Item>
        </Nav>

        <Switch>
          <Route exact path='/reports' component={Report}/>
          <Route path="/charts" component={Chart}/>
        </Switch>
      </div>
    </Router>
    )
  
}
