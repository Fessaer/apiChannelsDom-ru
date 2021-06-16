import React, { useContext, useEffect } from 'react'
import Chart from './Pages/Chart';
import Report from './Pages/Report';
import { Context } from './Store';
// import {
  // BrowserRouter as Router,
  // Switch,
  // Route} from 'react-router-dom';
// import { Navbar, Nav, Container} from 'react-bootstrap';
// import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse'
// import NavbarToggle from 'react-bootstrap/esm/NavbarToggle'
// import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Tabs } from 'antd';
import 'react-tabs/style/react-tabs.css';
// import ResponsiveNavbar from '@opuscapita/react-responsive-navbar';
const { TabPane } = Tabs;

export default function Navigation() {
  
  const [globalState, inSetState] = useContext(Context);
  useEffect(() => {
    inSetState({...globalState, toggleActivePage: 'report'})
  }, [])

  const handleChangeActivePage = (key) => {
    inSetState({...globalState, toggleActivePage: key})
    // console.log(key === "report" && loadingSpinnerChart === true && loadingFetchReport === false);
  }
  
  return (
    <>
    <div className="container-fluid">
    {/* <Tabs defaultIndex={0} onSelect={index => console.log(index)}>
      <TabList>
        <Tab>Отчёт</Tab>
        <Tab>График</Tab>
    </TabList>
    <TabPanel>{<Report />}</TabPanel>
    <TabPanel>{<Chart />}</TabPanel>
  </Tabs> */}
  <Tabs onChange={handleChangeActivePage} type="card">
    <TabPane tab="Отчёт" key="report">
      {<Report />}
    </TabPane>
    <TabPane tab="График" key="chart">
      {<Chart />}
    </TabPane>
  </Tabs>
    {/* <Nav fill variant="tabs" defaultActiveKey="/charts">
          
            <Nav.Link href="/reports">Отчёт</Nav.Link>
          
            <Nav.Link href="/charts">График</Nav.Link>
          
        </Nav> */}
    {/* <Router>  */}
      
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
        {/* <Navbar collapseOnSelect expand="md" bg="light" variant="secondary" >
        <Container>
          <NavbarToggle aria-controls="responsive-navbar-nav" />
            <NavbarCollapse id="mr-auto">
              <Nav.Link href="/reports">Отчёт</Nav.Link>
              <Nav.Link href="/charts">График</Nav.Link>
            </NavbarCollapse>
        </Container>
      </Navbar> */}
        
        

        {/* <Switch>
          <Route path='/reports' component={Report}/>
          <Route path="/charts" component={Chart}/>
        </Switch> */}
      </div>
    {/* </Router> */}
    </>
    )
}
