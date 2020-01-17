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
  const[auth, setAuth] = useState(false)
  firebase.auth().onAuthStateChanged(function(user) {
      let accessToken = user ? user.refreshToken : null
    if (user) {
      setLogged(true)
      setAuth(true)
      document.cookie = `token=${accessToken} SameSite=lax; max-age=${ 60 * 60 * 24 * 365}`
      console.log('signed')
    } else {
      setLogged(false)
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
  function handleSubmit(e){
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
      setAuth(true)
      props.history.push('/')
    }).catch(function(error) {
      console.log(error)
      props.enqueueSnackbar(error.message ? error.message : "Something went wrong", {
        variant: "error",
      });
    })
  }
  function signOut(){
    firebase.auth().signOut().then(function(response) {
      console.log(response)
      props.enqueueSnackbar('Signesd out Successfully', {
        variant: "success",
      });
      }).catch(function(error) {
      props.enqueueSnackbar(error.message ? error.message : "something went wrong", {
        variant: "error",
      });
    });
  }
  return (
    <div className="App">
      <div className="overlay">
        <p className='logout' onClick={signOut}>LOG OUT</p>
        {/* <Bank isAuth={auth}/> */}
        <Switch>
          <Route exact path="/" render={() => <Bank {...props} isAuth={auth}/>} />
          <Route exact path="/login" render={() => <Login submit={handleSubmit} {...props} isLogged={logged}/>}/>
          {/* <Route render={() => <div className='wrongroute'>404</div>} /> */}
        </Switch>
      </div>
    </div>
  );
}

export default withRouter(withSnackbar(App));

let data = {code: 'cib', name: 'CIB', active: true}
