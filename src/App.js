import React, {useState, useEffect} from 'react'
import './App.sass'
import Login from './Components/login/login'
import Bank from './Components/bank/bank'
import {Route , Switch , withRouter} from 'react-router-dom'
import firebase from './firebase'
import {withSnackbar} from 'notistack'
function App(props) {
  const[logged,setLogged] = useState(true)
  const[email,setEmail] = useState('')
  const[password,setPassword] =useState('')
  firebase.auth().onAuthStateChanged(function(user) {
      let accessToken = user ? user.refreshToken : null
    if (user) {
      setLogged(true)
      document.cookie = `token=${accessToken} SameSite=lax; max-age=${ 60 * 60 * 24 * 365}`
      console.log('signed')
    } else {
      setLogged(false)
      // console.log('error')
    }
  });
  useEffect(()=>{
    if(!logged){
      props.enqueueSnackbar("Register first to access website", {
        variant: "info",
      }); 
      props.history.push('/login')
    }
  },[logged])
  const handleSubmit = (e) =>{
    e.preventDefault()
    let data = new FormData(e.target)
    setEmail(data.get('email'))
    setPassword(data.get('password'))
    console.log("submit")
    firebase.auth().createUserWithEmailAndPassword(data.get('email'), data.get('password')).then(response =>{
      props.enqueueSnackbar("Registered Successfully", {
        variant: "success",
      });
      setLogged(true)
      props.history.push('/')
    }).catch(function(error) {
      console.log(error)
      props.enqueueSnackbar(error.message ? error.message : "Something went wrong", {
        variant: "error",
      });
    })
  }
  return (
    <div className="App">
      <div className="overlay">
        {/* <h2>BANK APP</h2> */}
        <Switch>
          <Route exact path="/" component={Bank} />
          <Route exact path="/login" component={() => <Login submit={handleSubmit} {...props} isLogged={logged}/>}/>
          <Route render={() => <div className='wrongroute'>404</div>} />
        </Switch>
      </div>
    </div>
  );
}

export default withRouter(withSnackbar(App));

let data = {code: 'cib', name: 'CIB', active: true}
