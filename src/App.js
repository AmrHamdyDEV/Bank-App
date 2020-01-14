import React, {useState} from 'react'
import './App.css'
import Login from './Components/login/login'
import {Route , Switch , withRouter , Redirect} from 'react-router-dom'
function App() {
  const[logged,setLogged] = useState(false)
  return (
    <div className="App">
      <Switch>
        {!logged ? <Redirect to='/login'/> : null}
        <Route path='/login' component={Login}/>
      </Switch>
    </div>
  );
}

export default withRouter(App);
