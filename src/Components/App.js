import './Styles/App.css';
import Navigation from './Navigation';
import Store from './Store';
import Auth from './Authorisation';

function App() {
  // Auth()
  return (
    <Store>
      {/* <Auth /> */}
      <Navigation />
    </Store>
  )
}

export default App;
