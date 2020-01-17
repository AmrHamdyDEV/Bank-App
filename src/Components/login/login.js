import React , {useEffect, useState} from 'react'
import {Container , Grid} from '@material-ui/core'
import styles from './assets/login.module.sass'
import {withSnackbar} from 'notistack'
import {Link} from 'react-router-dom'
const Login = (props) =>{
    const[login, setLogin]= useState(false)
    useEffect(()=>{
        if(props.isLogged){
            props.history.push('/')
        }
    },[])
function loginHandle(){
    setLogin(true)
}
    return(
        <Container>
            <Grid container justify='center' alignItems='center' className={styles.loginContainer}>
                <form id='login' onSubmit={props.submit} className={styles.form}>
                    <Grid container className={styles.email}>
                        <Grid item xs={12}>
                             <h2>{login ? 'LOGIN' : 'REGISTER'}</h2>
                         </Grid>
                        <Grid item xs={12} md={4}>
                            <label>Email</label>
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <input name='email' type='text'/>
                        </Grid>
                    </Grid>
                    <Grid container className={styles.password}>
                        <Grid item xs={12} md={4}>
                            <label>Password</label>
                        </Grid>
                        <Grid item xs={12} md={8}>
                            <input name='password' type='password'/>
                        </Grid>
                    </Grid>
                    <Grid container justify='center'>
                        <Grid item xs={12} className={styles.login}>
                           {!login ? <p onClick={loginHandle}>Already have account ? Log In</p> : null}
                        </Grid>
                    </Grid>
                    <Grid container justify='center'>
                        <Grid item xs={12} className={styles.submit}>
                            <input type='submit' value={login ? 'LOGIN' : 'SIGN UP'}/>
                        </Grid>
                    </Grid>
                </form>
            </Grid>
        </Container>
    )
}
export default withSnackbar(Login)