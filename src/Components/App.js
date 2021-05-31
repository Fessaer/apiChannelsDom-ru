import './Styles/App.css';
import Navigation from './Navigation';
import Store from './Store';

function App() {
  return (
    <Store>
      <Navigation />
    </Store>
  )
}

export default App;
