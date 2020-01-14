import React from 'react'
import {Container , Grid} from '@material-ui/core'
import axios from '../../axios'
const Login = () =>{
    const handleSubmit = (e) =>{
        e.preventDefault()
        let data = new FormData(e.target)
        for(let fields of data.entries()){
            console.log(fields)
        }
        let accessToken = document.cookie.split(';').find(item => item.trim().startsWith("access_token")).replace('access_token=' , '').trim()
        console.log(accessToken)
        axios.post('/login' , data , {headers:{Authorization : `Bearer ${accessToken}` , 'Accept': 'application/json'}}).then(response =>{
            // This Api dosent really work It's just for example
        
        })
    }
    return(
        <div>
            <Container>
                <form id='login' onSubmit={handleSubmit}>
                    <Grid container item>
                        <label>Email</label>
                        <input name='email' type='text'/>
                        <input name='username' type='text'/>
                    </Grid>
                    <Grid container item>
                        <label>Password</label>
                        <input name='password' type='password'/>
                    </Grid>
                    <Grid container item>
                        <input type='submit'/>
                    </Grid>
                </form>
            </Container>
        </div>
    )
}
export default Login