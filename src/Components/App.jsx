import React, { useState, useEffect } from 'react';
import Home from './Pages/Home';
import Store from './Store';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CardPage from './Pages/CardPage';

function App() {
  const [data, setData] = useState({});

  useEffect(() => {
    (
      async function dataFetch() {
      let url = 'https://epg.domru.ru/channel/list?domain=perm';
    await fetch(url, {
      method: 'GET',
    }).then((response) => {
      return response.json();
      }).then((data) => setData({data}))
    })()
  }, []);

    return (
      <Store>
        {data}
      <Router>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route 
          path="/CardPage"
          render={props => <CardPage {...props}/>}>
          </Route>
        </Switch>
      </Router>
      </Store>
      
  );
}


export default App;
