import React, { useEffect, useState } from "react";
import { BrowserRouter as Router,Switch, Route } from "react-router-dom";
import Navbar from "../components/Navbar";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5555/users")
      .then((r) => r.json())
      .then((users) => setUsers(users));
  }, []);

  return (
    <>
    <Router>
    <Navbar />
    <Switch>
      <Route path='/' exact />
    </Switch>

    </Router>
  
      
      
  
    </>
    
  )
  
}


export default App;
// {users.map(user=> {
//   return (
//     <div key = {user.id}>
   
//       <p>{user.username}</p>

      

//       </div>
      
//   )
// })}