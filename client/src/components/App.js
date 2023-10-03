// App.js or your main component
// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import RegisterForm from './RegisterForm';
import SuccessPage from './SuccessPage';
import UserList from './UserList'; // Import the UserList component

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/success-page" component={SuccessPage} />
        <Route path="/user-list" component={UserList} /> {/* Add this route */}
        <Route path="/" component={RegisterForm} />
      </Switch>
    </Router>
  );
}

export default App;

